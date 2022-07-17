const { api } = require("../../api");
const { filterLevelByAbility } = require("../../modules/filter/filterLevelByAbility");
const { getDate } = require("../../helpers/getDate");
const { getTimeBySec } = require("../../helpers/getTimeBySec");
const { getWeekday } = require("../../helpers/getWeekday");
const { readFile } = require("../../utils/promisify");
const { getNetwork } = require("../../helpers/getNetwork");
const { updateAliasStore } = require("../../modules/update/updateAliasStore");
const { isTurbo } = require("../../helpers/isTurbo");
const { getTimeByMS } = require("../../helpers/getTimeByMS");
const { getStatus } = require("../../helpers/getStatus");
const { isSuperTurbo } = require("../../helpers/isSuperTurbo");

module.exports = async (req, res) => {
  try {
    const networks = req.query.networks;
    const time = req.query.time;
    const isB = req.query.onlyKO == "true" ? true : false;
    const isT = req.query.onlyTurbo == "true" ? true : false;
    const isST = req.query.onlySuperTurbo == "true" ? true : false;
    const isNotB = req.query.onlyFreezout == "true" ? true : false;
    const isNotT = req.query.onlyNormal == "true" ? true : false;
    const moneyStart = req.query.moneyStart;
    const moneyEnd = req.query.moneyEnd;
    const level = req.query.level;
    const timezone = req.query.timezone;
    const alias = req.query.alias;

    updateAliasStore(alias, level);

    const ability1 = JSON.parse(await readFile("src/store/ability1/ability1.json"));
    const ability2WithoutName = JSON.parse(
      await readFile("src/store/ability2/ability2WithoutName.json"),
    );
    const gaps = JSON.parse(await readFile("src/store/gaps/gap.json"));
    const rules = JSON.parse(await readFile("src/store/rules/rules.json"));
    console.log("Начинаю делать запрос");
    let result = (
      await api.get(
        `https://www.sharkscope.com/api/pocarrleaderboard/networks/${networks}/activeTournaments?filter=Date!:${time}S;Type:NL,H;Class:SCHEDULED,SNG;`,
      )
    ).RegisteringTournamentsResponse;
    console.log("Сделал запрос");

    if (!result) {
      return res.json([]);
    }

    result = Array.from(result.RegisteringTournaments.RegisteringTournament);

    result = result
      .sort((a, b) => (a["@scheduledStartDate"] ?? 0) - (b["@scheduledStartDate"] ?? 0))
      .map((tournament) => {
        const network = getNetwork(tournament["@network"]);
        const name = tournament["@name"]?.toLowerCase();
        const stake = Number(tournament["@stake"] ?? 0);
        const rake = Number(tournament["@rake"] ?? 0);
        const bid = (stake + rake).toFixed(2);
        const isStartDate = tournament["@scheduledStartDate"] ?? 0;
        const isRegDate = tournament["@lateRegEndDate"] ?? 0;
        const startDate = Number(isStartDate * 1000) + Number(timezone);
        const regDate = Number(isRegDate * 1000) + Number(timezone);
        const time = getTimeByMS(Number(`${isStartDate}000`));
        const bounty = tournament["@flags"]?.includes("B");
        const turbo = isTurbo(tournament);
        const superturbo = isSuperTurbo(tournament);
        const status = getStatus(tournament);
        const currency = tournament["@currency"];
        const od = tournament["@flags"]?.includes("OD");
        const sng = tournament["@gameClass"]?.includes("sng");
        const isNL = tournament["@structure"] === "NL";
        const isH = tournament["@game"] === "H" || tournament["@game"] === "H6";
        const rebuy =
          network === "888"
            ? name?.includes("r&a")
            : tournament["@flags"]?.includes("R") && !tournament["@flags"]?.includes("RH");

        const isMandatoryСonditions = isNL && isH && !rebuy && !od && !sng;
        const info = ability1?.[network]?.[time]?.[bid]?.[name];
        const ability = isMandatoryСonditions && info?.["@avability"];
        const duration = info?.["@duration"] ? Math.round(info?.["@duration"]) : null;
        const statusGap = `${turbo ? "turbo" : "normal"}`;
        const gap = gaps?.[level]?.[network]?.[statusGap]?.[bid];
        const realBid = gap ? gap : bid;
        const abilityBid = ability2WithoutName?.[network]?.[level]?.[currency]?.[realBid]?.[status];

        //Фикс гарантии для WPN и 888Poker и Chiko
        if (network === "WPN" || network === "888") {
          const $ = tournament["@name"].split("$");
          if ($.length > 1)
            tournament["@guarantee"] = $[1].split(" ")[0].replace(")", "").replace(",", "");
        }

        const prizepool = Math.round(
          Math.max(
            Number(tournament["@guarantee"] ?? 0),
            Number(tournament["@prizePool"] ?? 0),
            (Number(tournament["@entrants"] ?? 0) + Number(tournament["@reEntries"] ?? 0)) *
              Number(tournament["@stake"] ?? 0),
            (Number(tournament["@totalEntrants"] ?? 0) + Number(tournament["@reEntries"] ?? 0)) *
              Number(tournament["@stake"] ?? 0),
          ),
        );

        const rulesAbility2 = rules[network]?.[time]?.[level]?.[currency]?.[realBid]?.[status]?.[
          tournament["@name"]
        ]
          ? rules[network]?.[time]?.[level]?.[currency]?.[realBid]?.[status]?.[tournament["@name"]]
          : rules[network]?.["all"]?.[level]?.[currency]?.[realBid]?.[status]?.["all"]
          ? rules[network]?.["all"]?.[level]?.[currency]?.[realBid]?.[status]?.["all"]
          : 0;

        return {
          ...tournament,
          "@bid": bid,
          "@realBid": realBid,
          "@turbo": turbo,
          "@rebuy": rebuy,
          "@od": tournament["@flags"]?.includes("OD"),
          "@bounty": bounty,
          "@sng": tournament["@gameClass"]?.includes("sng"),
          "@deepstack": tournament["@flags"]?.includes("D"),
          "@superturbo": superturbo,
          "@prizepool": prizepool > 0 ? prizepool : "-",
          "@network": network,
          "@ability": ability ? Number(ability) : "-",
          "@abilityBid": abilityBid ? Number(abilityBid) + Number(rulesAbility2) : "-",
          "@duration": duration ? getTimeBySec(duration) : "-",
          "@getWeekday": isStartDate ? getWeekday(startDate) : "-",
          "@scheduledStartDate": isStartDate ? getDate(startDate) : "-",
          "@lateRegEndDate": isRegDate ? getDate(regDate) : "-",
          "@timezone": timezone,
          "@status": status,
          "@level": level,
        };
      });

    console.log("Промапил данные");
    console.log(result.length);

    result = result.filter((tournament) => {
      const bounty = tournament["@flags"]?.includes("B");
      const turbo = tournament["@turbo"];
      const superturbo = tournament["@superturbo"];

      return (
        tournament["@bid"] >= Number(moneyStart) &&
        tournament["@bid"] <= Number(moneyEnd) &&
        (isB ? bounty : true) &&
        (isT && !isST ? turbo : true) &&
        (isST && !isT ? superturbo : true) &&
        (isT && isST ? turbo || superturbo : true) &&
        (isNotB ? !bounty : true) &&
        (isNotT ? !turbo : true) &&
        filterLevelByAbility(level, tournament)
      );
    });
    console.log(result.length);
    return res.json(result ?? []);
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  }
};
