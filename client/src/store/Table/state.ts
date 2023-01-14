import { createStore } from "effector";

import { getDate } from "./../../helpers/getDate";
import { getWeekday } from "./../../helpers/getWeekday";
import { getTimeBySec } from "./../../helpers/getTimeBySec";
import { isSat } from "./../../helpers/isSat";
import { isRebuy } from "./../../helpers/isRebuy";
import { getStatus } from "./../../helpers/getStatus";
import { isSuperTurbo } from "./../../helpers/isSuperTurbo";
import { isTurbo } from "./../../helpers/isTurbo";
import { isNormal } from "./../../helpers/isNormal";
import { getTimeByMS } from "./../../helpers/getTimeByMS";
import filter from "../../modules/filter/filter.js";

import { tableCellModel } from "../../@types/tableCellModel";
import { $tournamentsSettings } from "../Select";

import { getNetwork } from "./../../helpers/getNetwork";
import { $config } from "../Config";
import { $store } from "../Store";

export const $tableState = createStore<tableCellModel[] | null | undefined>(
  null
);

export const $filtredTableState = $tableState.map((tournaments) => {
  if (!tournaments) {
    return [];
  }

  const config = $config.getState();
  const { ability1, ability2, rules, currency: lastValue } = $store.getState();

  const {
    moneyStart,
    moneyEnd,
    KO: isKOQ,
    turbo: isTurboQ,
    superTurbo: isSTurboQ,
    freezout: isFreezoutQ,
    normal: isNormalQ,
    prizepoolStart,
    prizepoolEnd,
  } = $tournamentsSettings.getState();
  const { networks, timezone } = config ?? {};

  // сортировка по времени старта турнира
  tournaments = tournaments.sort(
    (a, b) =>
      Number(a["@scheduledStartDate"] ?? 0) -
      Number(b["@scheduledStartDate"] ?? 0)
  );

  // мапим все данные о турнирах
  tournaments = tournaments.map((tournament) => {
    const network = getNetwork(tournament["@network"]);
    const { level: networksLevel = 1, effmu = "A" } = networks?.[network] ?? {};
    const level = networksLevel + effmu;
    const name = tournament["@name"]?.toLowerCase();
    const stake = Number(tournament["@stake"] ?? 0);
    const rake = Number(tournament["@rake"] ?? 0);
    const bid = (stake + rake).toFixed(2);
    const isStartDate = tournament["@scheduledStartDate"] ?? 0;
    const isRegDate = tournament["@lateRegEndDate"] ?? 0;
    const startDate = Number(isStartDate) * 1000 + Number(timezone);
    const regDate = Number(isRegDate) * 1000 + Number(timezone);
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

    const duration = info?.["@duration"]
      ? Math.round(info?.["@duration"])
      : null;
    const abilityBid =
      ability2?.[network]?.[level]?.[currency]?.[bid]?.[status];
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
            .replace("M", "000000")
            .replace(".", "");
        } else if ((network === "WPN" && !sat) || network === "888") {
          tournament["@guarantee"] = $[1]
            .split(" ")[0]
            .replace(")", "")
            .replace(",", "");
        }
      }
    }

    const prizepool = Math.round(
      Math.max(
        Number(tournament["@guarantee"] ?? 0),
        Number(tournament["@prizePool"] ?? 0),
        (Number(tournament["@entrants"] ?? 0) +
          Number(tournament["@reEntries"] ?? 0)) *
          Number(tournament["@stake"] ?? 0),
        (Number(tournament["@totalEntrants"] ?? 0) +
          Number(tournament["@reEntries"] ?? 0)) *
          Number(tournament["@stake"] ?? 0)
      )
    );

    const rulesAbility2 = rules[network]?.[time]?.[level]?.[currency]?.[bid]?.[
      status
    ]?.[tournament["@name"]]
      ? rules[network]?.[time]?.[level]?.[currency]?.[bid]?.[status]?.[
          tournament["@name"]
        ]
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
      "@ability": ability ? ability : "-",
      "@abilityBid":
        typeof abilityBid === "number"
          ? Number(abilityBid) + Number(rulesAbility2)
          : "-",
      "@duration": duration ? getTimeBySec(duration) : "-",
      "@getWeekday": isStartDate ? getWeekday(startDate) : "-",
      "@scheduledStartDate": isStartDate ? getDate(startDate) : "-",
      "@lateRegEndDate": isRegDate ? getDate(regDate) : "-",
      "@numberLateRegEndDate": regDate,
      "@timezone": timezone,
      "@status": status,
      "@level": level,
      "@usdBid": currency === "CNY" ? Number(bid) / lastValue : bid,
      "@usdPrizepool": currency === "CNY" && pp !== "-" ? pp / lastValue : pp,
    };
  });

  // фильтр по параметрам
  tournaments = tournaments.filter((tournament) => {
    const bounty = tournament["@bounty"];
    const turbo = tournament["@turbo"];
    const superturbo = tournament["@superturbo"];
    const prizepool = tournament["@usdPrizepool"];

    return (
      tournament["@usdBid"] >= Number(moneyStart) &&
      tournament["@usdBid"] <= Number(moneyEnd) &&
      ((isKOQ !== false && isNormalQ !== false
        ? bounty && !turbo && !superturbo
        : false) ||
        (isKOQ !== false && isTurboQ !== false ? bounty && turbo : false) ||
        (isKOQ !== false && isSTurboQ !== false
          ? bounty && superturbo
          : false) ||
        (isFreezoutQ !== false && isNormalQ !== false
          ? !bounty && !turbo && !superturbo
          : false) ||
        (isFreezoutQ !== false && isTurboQ !== false
          ? !bounty && turbo
          : false) ||
        (isFreezoutQ !== false && isSTurboQ !== false
          ? !bounty && superturbo
          : false)) &&
      (prizepool !== "-"
        ? prizepoolStart <= prizepool && prizepool <= prizepoolEnd
        : true)
    );
  });

  // определение цвета турнира
  tournaments = tournaments.map((tournament) => {
    const level = tournament["@level"];
    const {
      valid,
      guarantee = 1,
      rules,
      color: colorRule,
    } = filter.filter(level, tournament, true);
    const ability1 = Number(tournament["@ability"]);
    const ability2 = Number(tournament["@abilityBid"]);
    const usdPrizepool = tournament["@usdPrizepool"];
    const prizepool = Number(usdPrizepool === "-" ? 1 : usdPrizepool);

    let color = "rgba(2235,96,96,0.5)";

    if (ability2 - ability1 >= 1 && ability2 - ability1 <= 2) {
      color = "rgba(247,255,105,0.5)"; // желтый
    }
    if (
      tournament["@abilityBid"] === "-" ||
      tournament["@ability"] === "-" ||
      !ability2 ||
      !ability1
    ) {
      color = "rgb(238 236 255)"; // обычный цвет
    }
    if (ability2 - ability1 >= 3) {
      color = "rgba(98,179,82,0.5)"; // зеленый
    }
    if (
      (colorRule === "red" || colorRule === "blue") &&
      rules &&
      prizepool / Number(guarantee) >= 1.5
    ) {
      color = "rgba(98,179,82,0.5)"; // зеленый
    }

    return { ...tournament, color, valid };
  });

  // фильтр по времени "от"-"до"
  tournaments = tournaments.filter((item) => {
    const startDate = item?.["@scheduledStartDate"] ?? "-";
    const { dateStart, dateEnd } = $tournamentsSettings.getState();

    if (!item.valid) return false;
    if (startDate === "-") return true;

    const res = startDate?.split(", ")?.[1]?.split(":")?.[0];
    const r = dateEnd === "00" && dateStart <= dateEnd ? "24" : dateEnd;

    return dateStart <= dateEnd
      ? dateStart <= res && res <= r
      : !(dateStart > res && res > dateEnd);
  });

  return tournaments;
});
