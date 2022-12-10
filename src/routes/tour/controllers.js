const { api } = require("../../api");
const { getDate } = require("../../helpers/getDate");
const { getTimeBySec } = require("../../helpers/getTimeBySec");
const { getWeekday } = require("../../helpers/getWeekday");
const { readFile } = require("../../utils/promisify");
const { getNetwork } = require("../../helpers/getNetwork");
const { isTurbo } = require("../../helpers/isTurbo");
const { getTimeByMS } = require("../../helpers/getTimeByMS");
const { getStatus } = require("../../helpers/getStatus");
const { getConfig } = require("../../utils/config");
const { isSuperTurbo } = require("../../helpers/isSuperTurbo");
const { getRulesAbility2 } = require("../../utils/rules");
let filter = require("../../modules/filter/filter");
const { isRebuy } = require("../../helpers/isRebuy");
const { isSat } = require("../../helpers/IsSat");
const { isNormal } = require("../../helpers/isNormal");
// const { parseCurrencyRate } = require("../../modules/parseCurrencyRate/parseCurrencyRate");

const getTournaments = async (req, res) => {
  try {
    const {
      network,
      time,
      alias,
      timezone,
      moneyStart,
      moneyEnd,
      KO: isKOQ,
      turbo: isTurboQ,
      superTurbo: isSTurboQ,
      freezout: isFreezoutQ,
      normal: isNormalQ,
      dateStart,
      dateEnd,
      prizepoolStart,
      prizepoolEnd,
    } = req.query;

    if (network == "undefined")
      return res.status(404).send({
        message: "Select game network",
      });

    if (
      !(isKOQ !== "false" || isFreezoutQ !== "false") ||
      !(isTurboQ !== "false" || isSTurboQ !== "false" || isNormalQ !== "false")
    )
      return res.status(404).send({
        message: "Select tournament format [KO, Frezoout] and [Normal, Turbo, SuperTurbo]",
      });

    delete require.cache[require.resolve("../../modules/filter/filter")];
    filter = require("../../modules/filter/filter");

    const config = await getConfig();
    const lastValue = JSON.parse(await readFile("src/store/currency/currency.json")).currency;
    const configByAlias = config[alias];

    if (!configByAlias) return res.send(result ?? []);

    const { effmu, networks } = configByAlias;

    const ability1 = JSON.parse(await readFile("src/store/ability1/ability1.json"));
    const ability2WithoutName = JSON.parse(
      await readFile("src/store/ability2/ability2WithoutName.json"),
    );
    const rules = await getRulesAbility2();
    console.log("Начинаю делать запрос");
    let result = (
      await api.get(
        `https://www.sharkscope.com/api/pocarrleaderboard/networks/${network}/activeTournaments?filter=Date!:${time}S;Type:NL,H;Class:SCHEDULED,SNG;`,
      )
    ).RegisteringTournamentsResponse;
    console.log("Сделал запрос");

    if (!result) {
      return res.send([]);
    }

    result = Array.from(result.RegisteringTournaments.RegisteringTournament);

    result = result
      .sort((a, b) => (a["@scheduledStartDate"] ?? 0) - (b["@scheduledStartDate"] ?? 0))
      .map((tournament) => {
        const network = getNetwork(tournament["@network"]);
        const level = networks[network] + effmu;
        const name = tournament["@name"]?.toLowerCase();
        const stake = Number(tournament["@stake"] ?? 0);
        const rake = Number(tournament["@rake"] ?? 0);
        const bid = (stake + rake).toFixed(2);
        const isStartDate = tournament["@scheduledStartDate"] ?? 0;
        const isRegDate = tournament["@lateRegEndDate"] ?? 0;
        const startDate = Number(isStartDate * 1000) + Number(timezone);
        const regDate = Number(isRegDate * 1000) + Number(timezone);
        const time = getTimeByMS(Number(`${isStartDate}000`));
        const bounty = isNormal(tournament);
        const turbo = isTurbo(tournament);
        const superturbo = isSuperTurbo(tournament);
        const status = getStatus(tournament);
        const currency = tournament["@currency"];
        const od = tournament["@flags"]?.includes("OD");
        const sng = tournament["@gameClass"]?.includes("sng");
        const isNL = tournament["@structure"] === "NL";
        const isH = tournament["@game"] === "H" || tournament["@game"] === "H6";
        const rebuy = isRebuy(tournament);

        const isMandatoryСonditions = isNL && isH && !rebuy && !od && !sng;
        const info = ability1?.[network]?.[time]?.[bid]?.[name];
        const ability = isMandatoryСonditions && info?.["@avability"];
        const duration = info?.["@duration"] ? Math.round(info?.["@duration"]) : null;
        const abilityBid = ability2WithoutName?.[network]?.[level]?.[currency]?.[bid]?.[status];
        const sat = isSat(tournament);

        //Фикс гарантии для WPN и 888Poker и Chiko
        if (network === "WPN" || network === "888" || network === "Chico") {
          const $ = tournament["@name"].split("$");
          if ($.length > 1) {
            if (network === "Chico" && !sat) {
              tournament["@guarantee"] = $[2]
                ?.split(" ")?.[0]
                ?.replace(",", "")
                .replace(".5K", "500")
                .replace("K", "000")
                .replace("K", "000")
                .replace("M", "000000")
                .replace(".", "");
            } else if ((network === "WPN" && !sat) || network === "888") {
              tournament["@guarantee"] = $[1].split(" ")[0].replace(")", "").replace(",", "");
            }
          }
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

        const rulesAbility2 = rules[network]?.[time]?.[level]?.[currency]?.[bid]?.[status]?.[
          tournament["@name"]
        ]
          ? rules[network]?.[time]?.[level]?.[currency]?.[bid]?.[status]?.[tournament["@name"]]
          : rules[network]?.["all"]?.[level]?.[currency]?.[bid]?.[status]?.["all"]
          ? rules[network]?.["all"]?.[level]?.[currency]?.[bid]?.[status]?.["all"]
          : 0;

        const pp = prizepool >= 0 ? prizepool : "-";

        return {
          ...tournament,
          "@date": isStartDate,
          "@bid": bid,
          "@realBid": bid,
          "@turbo": !!turbo,
          "@rebuy": !!rebuy,
          "@od": !!tournament["@flags"]?.includes("OD"),
          "@bounty": !!bounty,
          "@sat": !!sat,
          "@sng": !!tournament["@gameClass"]?.includes("sng"),
          "@deepstack": !!tournament["@flags"]?.includes("D"),
          "@superturbo": !!superturbo,
          "@prizepool": pp,
          "@network": network,
          "@ability": ability ? Number(ability) : "-",
          "@abilityBid": abilityBid ? Number(abilityBid) + Number(rulesAbility2) : "-",
          "@duration": duration ? getTimeBySec(duration) : "-",
          "@getWeekday": isStartDate ? getWeekday(startDate) : "-",
          "@scheduledStartDate": isStartDate ? getDate(startDate) : "-",
          "@lateRegEndDate": isRegDate ? getDate(regDate) : "-",
          "@numberLateRegEndDate": regDate,
          "@timezone": timezone,
          "@status": status,
          "@level": level,
          "@usdBid": currency === "CNY" ? bid / lastValue : bid,
          "@usdPrizepool": currency === "CNY" && pp !== "-" ? pp / lastValue : pp,
        };
      });

    console.log("Промапил данные");
    console.log(result.length);

    result = result.filter((tournament) => {
      const bounty = tournament["@bounty"];
      const turbo = tournament["@turbo"];
      const superturbo = tournament["@superturbo"];
      const level = tournament["@level"];
      const prizepool = tournament["@usdPrizepool"];
      const startDate = tournament["@scheduledStartDate"];

      // фильтрация по дате
      const hours = startDate?.split(", ")?.[1]?.split(":")?.[0];
      const isDateFiltred =
        startDate !== "-"
          ? dateStart <= dateEnd
            ? dateStart <= hours && hours <= dateEnd === "00" && dateStart <= dateEnd
              ? "24"
              : dateEnd
            : !(dateStart > hours && hours > dateEnd)
          : true;

      return (
        tournament["@usdBid"] >= Number(moneyStart) &&
        tournament["@usdBid"] <= Number(moneyEnd) &&
        ((isKOQ != "false" && isNormalQ != "false" ? bounty && !turbo && !superturbo : false) ||
          (isKOQ != "false" && isTurboQ != "false" ? bounty && turbo : false) ||
          (isKOQ != "false" && isSTurboQ != "false" ? bounty && superturbo : false) ||
          (isFreezoutQ != "false" && isNormalQ != "false"
            ? !bounty && !turbo && !superturbo
            : false) ||
          (isFreezoutQ != "false" && isTurboQ != "false" ? !bounty && turbo : false) ||
          (isFreezoutQ != "false" && isSTurboQ != "false" ? !bounty && superturbo : false)) &&
        isDateFiltred &&
        (prizepool !== "-" ? prizepoolStart <= prizepool && prizepool <= prizepoolEnd : true) &&
        filter.filter(level, tournament, true)
      );
    }).map(tournament => {
      const ability1 = tournament['@ability'] === '-' ? 0 : tournament['@ability'];
      const ability2 = tournament['@abilityBid'] === '-' ? 0 : tournament['@abilityBid'];
      const isAbility1 = ability1 && ability1 !== '-'
      const isAbility2 = ability2 && ability2 !== '-'
      // const isAbility = isAbility1 && isAbility2 && Number(ability1) <= Number(ability2)
      let color;
      if(ability2 === ability1 || !isAbility2 || !isAbility1) {
        color = 'rgba(2235,96,96,0.5)' // красный
      } 
      if((Math.abs(ability2 - ability1) >= 1) && (Math.abs(ability2 - ability1) <= 3)) {
        color = 'rgba(247,255,105,0.5)' // желтый
      } 
      if(Math.abs(ability2 - ability1) >= 4) {
        color = 'rgba(98,179,82,0.5)' // зеленый
      } 
      return {...tournament, color}
    })
    console.log(result.length);
    return res.send(result ?? []);
  } catch (err) {
    console.log(err);
    res.status(500).send([]);
  }
};

module.exports = {
  getTournaments,
};
