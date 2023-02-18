const fs = require("fs");
const { api } = require("../../api");
const { getMoreProp } = require("../../helpers/getMoreProp");
const { getWeekday } = require("../../helpers/getWeekday");
const { readFile, writeFile } = require("../../utils/promisify");
const { deleteFolder } = require("../delete/deleteFolder");
const { getStatus } = require("../../helpers/getStatus");
const { sendStatistics } = require("../send/sendStatistics");
const { getCurrencyRate } = require("../currencyRate/getCurrencyRate");

let filter = require("../filter/filter");

const collectionStatistics = async () => {
  const errorTournaments = {};

  delete require.cache[require.resolve("../filter/filter")];
  filter = require("../filter/filter");

  try {
    const lastValue = await getCurrencyRate();
    const currentTime = new Date(
      new Date(Date.now() - 2 * 86400000).toLocaleString("en-EN", {
        timeZone: "UTC",
      }),
    );
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate();
    const date = `${year}-${month}-${day}`;
    const path = `src/store/copies/${date}`;
    const stateConfig = JSON.parse(await readFile(`${path}/config.json`));
    const ability1 = JSON.parse(await readFile(`${path}/ability1.json`));
    const ability2 = JSON.parse(await readFile(`${path}/ability2.json`));
    const rules = JSON.parse(await readFile(`${path}/rules.json`));
    const config = JSON.parse(await readFile(`src/store/config/config.json`));
    const offpeak = JSON.parse(await readFile("src/store/offpeak/offpeak.json"));

    await Promise.all(
      Object.keys(stateConfig).map(async (alias) => {
        const configByAlias = stateConfig[alias];

        if (!configByAlias) return;

        const { networks } = configByAlias;

        let result;

        try {
          result = await api.get(
            `https://www.sharkscope.com/api/pocarrleaderboard/networks/Player Group/players/${alias}/completedTournaments?Order=Last,99&filter=Date:3d;Date:0~${Math.round(
              +new Date(
                new Date(date).toLocaleString("en-EN", {
                  timeZone: "UTC",
                }),
              ) /
                1000 +
                86400 * 2,
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
          Array.from(tournaments)
            .filter(
              (tournament) =>
                Number(
                  new Date(
                    Number((tournament["@date"] ?? tournament["@scheduledStartDate"] ?? 0) + "000"),
                  ).toLocaleString("en-EN", {
                    day: "numeric",
                    timeZone: "UTC",
                  }),
                ) === Number(day),
            )
            .forEach((ft) => {
              const d = Number(ft["@duration"] ?? 0);
              const t = getMoreProp(ft);
              const name = t["@name"]?.toLowerCase();
              const network = t["@network"];
              const { level: networksLevel, effmu } = networks[network];
              const level = networksLevel + effmu;
              const currency = t["@currency"];
              const bid = t["@bid"];
              const status = getStatus(t);
              const isStartDate = Number(t["@date"] ?? t["@scheduledStartDate"] ?? 0);

              const data = new Date(Number(Number(`${isStartDate - d}000`)))
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

              const abilityBid = ability2?.[network]?.[level]?.[currency]?.[bid]?.[status] ?? 0;

              const rulesAbility2 = rules[network]?.[data[1]]?.[level]?.[currency]?.[bid]?.[
                status
              ]?.[t["@name"]]
                ? rules[network]?.[data[1]]?.[level]?.[currency]?.[bid]?.[status]?.[t["@name"]]
                : rules[network]?.["all"]?.[level]?.[currency]?.[bid]?.[status]?.["all"]
                ? rules[network]?.["all"]?.[level]?.[currency]?.[bid]?.[status]?.["all"]
                : 0;

              const realAbility = abilityBid + rulesAbility2;

              const startDate = Number(isStartDate * 1000);

              const info = ability1?.[network]?.[data[1]]?.[bid]?.[name]?.["@avability"];
              const pp = t["@prizepool"] >= 0 ? t["@prizepool"] : "-";
              t["@ability"] = info ? info : "-";
              t["@abilityBid"] = realAbility ? realAbility : "-";
              t["@getWeekday"] = isStartDate ? getWeekday(startDate) : "-";
              t["@realDuration"] = d;
              t["@alias"] = alias;
              t["@nickname"] = t?.["TournamentEntry"]?.["@playerName"] ?? "undefined";
              t["@prize"] = t?.["TournamentEntry"]?.["@prize"] ?? 0;
              t["@d"] = data[0];
              t["@times"] = data[1];
              t["@level"] = level;
              t["@multientries"] = t?.["TournamentEntry"]?.["@multientries"] ?? 0;
              t["@usdBid"] = currency === "CNY" ? bid / lastValue : bid;
              t["@usdPrizepool"] = currency === "CNY" && pp !== "-" ? pp / lastValue : pp;

              if (Number(bid) !== 0 && !filter.filter(level, offpeak, t, true).valid) {
                if (!errorTournaments[alias]) errorTournaments[alias] = [];
                errorTournaments[alias].push(t);
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
