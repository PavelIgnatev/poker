const { api } = require("../../api");
const { getDate } = require("../../helpers/getDate");
const { getTimeByMS } = require("../../helpers/getTimeByMS");
const { getMoreProp } = require("../../helpers/getMoreProp");
const { getWeekday } = require("../../helpers/getWeekday");
const { readFile, writeFile } = require("../../utils/promisify");
const { filterLevelByAbility } = require("../filter/filterLevelByAbility");
const { deleteFolder } = require("../delete/deleteFolder");
const { isTurbo } = require("../../helpers/isTurbo");
const { sendStatistics } = require("../send/sendStatistics");
const { getStatus } = require("../../helpers/getStatus");

const collectionStatistics = async () => {
  const errorTournaments = [];
  const prevErrorTournaments = JSON.parse(await readFile(`src/store/errors/errorTournaments.json`));
  const nowDate = Math.max(
    ...(Object.keys(prevErrorTournaments).length > 0 ? Object.keys(prevErrorTournaments) : [0]),
  );
  const nowError = {};
  nowError[nowDate + 1] = errorTournaments;
  const nesw = Object.assign(prevErrorTournaments, nowError);

  try {
    const currentTime = new Date(Date.now() - 2 * 86400000);
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate();
    const date = `${year}-${month}-${day}`;
    console.log(date);
    const path = `src/store/copies/${date}`;
    const stateAlias = JSON.parse(await readFile(`${path}/alias.json`));
    const ability1 = JSON.parse(await readFile(`${path}/ability1.json`));
    const ability2 = JSON.parse(await readFile(`${path}/ability2.json`));
    const gaps = JSON.parse(await readFile("src/store/gaps/gap.json"));
    const rules = JSON.parse(await readFile(`${path}/rules.json`));
    const aliases = JSON.parse(await readFile(`src/store/alias/alias.json`));

    await Promise.all(
      Object.keys(stateAlias).map(async (alias) => {
        const level = stateAlias[alias].level;
        let result;

        try {
          result = await api.get(
            `https://www.sharkscope.com/api/pocarrleaderboard/networks/Player Group/players/${alias}/completedTournaments?Order=Last,99&filter=Date:3d;Date:0~${Math.round(
              +new Date(date + "Z") / 1000 + 86400,
            )}`,
          );
        } catch (error) {
          console.log(error);
          if (aliases[alias]) delete aliases[alias];
        }

        if (result?.ErrorResponse?.Error?.$ === "Player group not found.") {
          if (aliases[alias]) delete aliases[alias];
          console.log(`Алиас ${alias} удален из базы`);
        }

        //  ErrorResponse: { Error: { '@id': '102002', '$': 'Daily searches quota used up.' } },

        const tournaments =
          result?.PlayerResponse?.PlayerView?.PlayerGroup?.CompletedTournaments?.Tournament ?? [];

        if (!tournaments.length) {
          console.log("Игрок", alias, "без турниров", new Date());
        } else {
          tournaments.forEach((ft) => {
            const d = Number(ft["@duration"] ?? 0);
            const t = getMoreProp(ft);
            const name = t["@name"]?.toLowerCase();
            const network = t["@network"];
            const currency = t["@currency"];
            const bounty = t["@flags"]?.includes("B");
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
            t["@d"] = data[0];
            t["@times"] = data[1];
            t["@level"] = level;
            t["@multientries"] = t?.["TournamentEntry"]?.["@multientries"] ?? 0;

            if (Number(bid) !== 0 && !filterLevelByAbility(level, t)) {
              errorTournaments.push(t);
            }
          });
        }
      }),
    );

    if (nowDate === 6) {
      const statistics = [];
      Object.keys(nesw).forEach((day) => {
        statistics.push(...nesw[day]);
      });
      sendStatistics(statistics);

      await writeFile("src/store/errors/errorTournaments.json", JSON.stringify({}));
    } else {
      // если дней в базе теперь не 7, то просто добавляем турик в errorTournaments
      const max = Math.max(...Object.keys(nesw));

      if (nesw[max].length) {
        await writeFile("src/store/errors/errorTournaments.json", JSON.stringify(nesw));
      }
    }

    console.log("Перезаписываю алиасы");
    await writeFile("src/store/alias/alias.json", JSON.stringify(aliases));
    console.log(`Удаляю папку за день ${date}`);
    deleteFolder(`src/store/copies/${date}`);
  } catch (error) {
    console.log("При отправке письма произошла ошибка", error);
    console.log("Важно не забывать, что мы смотрим на 2 дня назад, так что возможно все заебись");
  }
};

module.exports = { collectionStatistics };
