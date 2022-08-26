const { api } = require("../../api");
const { getDate } = require("../../helpers/getDate");
const { getTimeByMS } = require("../../helpers/getTimeByMS");
const { getMoreProp } = require("../../helpers/getMoreProp");
const { getWeekday } = require("../../helpers/getWeekday");
const { readFile, writeFile } = require("../../utils/promisify");
const { filter } = require("../filter/filter");
const { deleteFolder } = require("../delete/deleteFolder");
const { isTurbo } = require("../../helpers/isTurbo");
const { getStatus } = require("../../helpers/getStatus");
const currency = require("node-currency");
const { sendStatistics } = require("../send/sendStatistics");

const collectionStatistics = async () => {
  const errorTournaments = {};
  const { lastValue } = await currency.getCurrency("usd-cny");

  try {
    const currentTime = new Date(
      new Date(Date.now() - 2 * 86400000).toLocaleString("en-EN", {
        timeZone: "America/New_York",
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
    const gaps = JSON.parse(await readFile("src/store/gaps/gap.json"));
    const rules = JSON.parse(await readFile(`${path}/rules.json`));
    const config = JSON.parse(await readFile(`src/store/config/config.json`));

    await Promise.all(
      Object.keys(stateConfig).map(async (alias) => {
        const configByAlias = stateConfig[alias];

        if (!configByAlias) return;

        const { effmu, networks } = configByAlias;

        let result;

        try {
          result = await api.get(
            `https://www.sharkscope.com/api/pocarrleaderboard/networks/Player Group/players/${alias}/completedTournaments?Order=Last,99&filter=Date:3d;Date:0~${Math.round(
              +new Date(new Date(date).toLocaleString("en-EN", { timeZone: "America/New_York" })) /
                1000 +
                86400 * 2,
            )}`,
          );
        } catch (error) {
          console.log(error);
          if (config[alias]) delete config[alias];
        }

        if (result?.ErrorResponse?.Error?.$ === "Player group not found.") {
          if (config[alias]) delete config[alias];
          console.log(`Алиас ${alias} удален из базы`);
        }

        const tournaments =
          result?.PlayerResponse?.PlayerView?.PlayerGroup?.CompletedTournaments?.Tournament ?? [];

        if (!tournaments?.length) {
          console.log("Игрок", alias, "без турниров", new Date());
        } else {
          // Фильтруем те, которые идут не в нужный день по таймзоне EST
          Array.from(tournaments)
            .filter(
              (tournament) =>
                new Date(
                  new Date(Number(tournament["@date"] + "000")).toLocaleString("en-EN", {
                    timeZone: "America/New_York",
                  }),
                )
                  .toLocaleDateString()
                  .split(".")[0] == day,
            )
            .forEach((ft) => {
              const d = Number(ft["@duration"] ?? 0);
              const t = getMoreProp(ft);
              const name = t["@name"]?.toLowerCase();
              const network = t["@network"];
              const level = networks[network] + effmu;
              const currency = t["@currency"];
              const turbo = isTurbo(t);
              const bid = t["@bid"];
              const statusGap = `${turbo ? "turbo" : "normal"}`;
              const status = getStatus(d);
              const gap = gaps?.[level]?.[network]?.[statusGap]?.[bid];
              const realBid = gap ? gap : bid;
              const isStartDate = Number(t["@date"] ?? t["@scheduledStartDate"] ?? 0);
              const time = getTimeByMS(Number(`${isStartDate - d}000`));

              const abilityBid = ability2?.[network]?.[level]?.[currency]?.[realBid]?.[status] ?? 0;

              const rulesAbility2 = rules[network]?.[time]?.[level]?.[currency]?.[realBid]?.[
                status
              ]?.[t["@name"]]
                ? rules[network]?.[time]?.[level]?.[currency]?.[realBid]?.[status]?.[t["@name"]]
                : rules[network]?.["all"]?.[level]?.[currency]?.[realBid]?.[status]?.["all"]
                ? rules[network]?.["all"]?.[level]?.[currency]?.[realBid]?.[status]?.["all"]
                : 0;

              const info = ability1?.[network]?.[time]?.[bid]?.[name]?.["@avability"];

              const realAbility = abilityBid + rulesAbility2;

              const startDate = Number(isStartDate * 1000);
              const data = getDate(Number(`${isStartDate - d}000`)).split(", ");

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

              if (Number(bid) !== 0 && !filter(level, t)) {
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
    } catch (error) {
      console.log(error);
    }
    // deleteFolder(`src/store/copies/${date}`);
  } catch (error) {
    console.log("При сборе данных для письма произошла ошибка", error);
    console.log("Важно не забывать, что мы смотрим на 2 дня назад, так что возможно все заебись");
  }
};

module.exports = { collectionStatistics };
