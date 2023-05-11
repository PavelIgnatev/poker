const { api } = require("../../api");
const { getMoreProp } = require("../../helpers/getMoreProp");
const { getWeekday } = require("../../helpers/getWeekday");
const { readFile, writeFile } = require("../../utils/promisify");
const { sendStatistics } = require("../send/sendStatistics");

let filter = require("../filter/filter");
const { getCurrencyRate } = require("../currencyRate/getCurrencyRate");

function parseсUTCToMilliseconds(datetimeStr) {
  const date = new Date(`${datetimeStr} UTC`);

  return date.getTime() / 1000 + 86400;
}

const collectionStatistics = async () => {
  const errorTournaments = {};

  delete require.cache[require.resolve("../filter/filter")];
  filter = require("../filter/filter");

  try {
    const lastValue = await getCurrencyRate();
    const currentTime = new Date(
      new Date(Date.now() - 3 * 86400000).toLocaleString("en-EN", {
        timeZone: "UTC",
      }),
    );
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate();
    const date = `${year}-${month}-${day}`;
    console.log(date, new Date(), "collection statistic", "ms: ", parseсUTCToMilliseconds(date));
    const path = `src/store/copies/${date}`;
    const stateConfig = JSON.parse(await readFile(`${path}/config.json`));
    const ability1 = JSON.parse(await readFile(`${path}/ability1.json`));
    const config = JSON.parse(await readFile(`src/store/config/config.json`));

    await Promise.all(
      Object.keys(stateConfig).map(async (alias) => {
        const configByAlias = stateConfig[alias];

        if (!configByAlias) return;

        const { networks } = configByAlias;

        let result;

        try {
          result = await api.get(
            `https://www.sharkscope.com/api/komanda/networks/Player Group/players/${alias}/completedTournaments?Order=Last,99&filter=Date:3d;Date:0~${parseсUTCToMilliseconds(
              date,
            )}`,
          );
        } catch (error) {
          console.log(`Алиас ${alias} вызвал ошибку шарскопа`);
        }

        if (result?.ErrorResponse?.Error?.$ === "Player group not found.") {
          if (config[alias]) delete config[alias];
          console.log(`Алиас ${alias} удален из базы`);
        }

        const tournaments =
          result?.PlayerResponse?.PlayerView?.PlayerGroup?.CompletedTournaments?.Tournament ?? [];

        console.log(alias, "сыграл ", tournaments.length, " турниров");

        if (!tournaments?.length) {
          console.log("Игрок", alias, "без турниров", new Date());
        } else {
          // Фильтруем те, которые идут не в нужный день по таймзоне EST
          Array.from(tournaments).forEach((ft) => {
            const t = getMoreProp(ft);
            const network = t?.["@network"];
            if (networks?.[network]) {
              const d = Number(ft["@duration"] ?? 0);
              const name = t["@name"]?.toLowerCase();
              const currency = t["@currency"];

              const { level: networksLevel } = networks[network];
              const level = networksLevel + 'A';

              const bid = t["@bid"];
              const isStartDate = Number(t["@date"] ?? 0);
              const ms = Number(`${isStartDate - d}000`);

              const data = new Date(ms)
                .toLocaleString("en-EN", {
                  hour12: false,
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "numeric",
                  timeZone: "UTC",
                })
                .replace(", 24", ", 00")
                .split(", ");


              const info = ability1?.[network]?.[data[1]]?.[bid]?.[name]?.["@avability"];
              const pp = t["@prizepool"] >= 0 ? t["@prizepool"] : "-";
              t["@ability"] = info ? info : "-";
              t["@getWeekday"] = isStartDate ? getWeekday(ms) : "-";
              t["@realDuration"] = d;
              t["@alias"] = alias;
              t["@nickname"] = t?.["TournamentEntry"]?.["@playerName"] ?? "undefined";
              t["@prize"] = t?.["TournamentEntry"]?.["@prize"] ?? 0;
              t["@d"] = data[0];
              t["@times"] = data[1];
              t["@level"] = level.replace("A", "");
              t["@multientries"] = t?.["TournamentEntry"]?.["@multientries"] ?? 0;
              t["@usdBid"] = currency === "CNY" ? Math.round(Number(bid) / lastValue) : Number(bid);
              t["@usdPrizepool"] =
                currency === "CNY" && pp !== "-" ? Math.round(Number(pp) / lastValue) : Number(pp);

              if (Number(bid) !== 0 && !filter.filter(level, t, true).valid) {
                if (!errorTournaments[alias]) errorTournaments[alias] = [];
                errorTournaments[alias].push(t);
              }
            }
          });
        }
      }),
    );

    console.log("Перезаписываю алиасы");
    await writeFile("src/store/config/config.json", JSON.stringify(config));
    try {
      await sendStatistics(errorTournaments);
      console.log("Начинаю удалять папку дня ", date);
      // await deleteFolder(`src/store/copies/${date}`);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("При сборе данных для письма произошла ошибка", error);
    console.log("Важно не забывать, что мы смотрим на 2 дня назад, так что возможно все заебись");
  }
};

module.exports = { collectionStatistics };
