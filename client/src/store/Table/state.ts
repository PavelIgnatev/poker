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

import { tableCellModel } from "../../@types/tableCellModel";
import { $tournamentsSettings } from "../Select";

import { getNetwork } from "./../../helpers/getNetwork";
import { $config } from "../Config";
import { $filterContent } from "../Filter";
import { $store } from "../Store";
import { dateToTimeString } from "../../helpers/dateToTimeString";
import { timeStringToMilliseconds } from "../../helpers/timeStringToMilliseconds";

export const $tableState = createStore<tableCellModel[] | null | undefined>(
  null
);

export const $filtredTableState = $tableState.map((tournaments) => {
  if (!tournaments) {
    return [];
  }

  const config = $config.getState();
  const filter = $filterContent.getState();
  const { ability1, lastValue } = $store.getState();

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
    const { level: networksLevel = 1 } = networks?.[network] ?? {};
    const level = networksLevel + "A";
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
    const rebuy = isRebuy(tournament);
    const currency = tournament["@currency"];

    const info = ability1?.[network]?.[time]?.[bid]?.[name];
    const ability = info?.["@avability"];

    const duration = info?.["@duration"]
      ? Math.round(info?.["@duration"])
      : null;
    const sat = isSat(tournament);

    //Фикс гарантии для WPN и 888Poker и Chiko
    if (network === "WPN" || network === "888Poker" || network === "Chico") {
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
        } else if ((network === "WPN" && !sat) || network === "888Poker") {
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
      "@scheduled": !!tournament["@gameClass"]?.includes("scheduled"),
      "@NL": !!(tournament["@structure"] === "NL"),
      "@PL": !!(tournament["@structure"] === "PL"),
      "@PNL": !!(tournament["@structure"] === "PNL"),
      "@FL": !!(tournament["@structure"] === "FL"),
      "@ML": !!(tournament["@structure"] === "ML"),
      "@H": !!(tournament["@game"] === "H"),
      "@H6": !!(tournament["@game"] === "H6"),
      "@O": !!(tournament["@game"] === "O"),
      "@OHL": !!(tournament["@game"] === "OHL"),
      "@deepstack": !!tournament["@flags"]?.includes("D"),
      "@superturbo": !!superturbo,
      "@prizepool": pp,
      "@network": network,
      "@ability": ability ? ability : "-",
      "@duration": duration ? getTimeBySec(duration) : "-",
      "@getWeekday": isStartDate ? getWeekday(Number(isStartDate) * 1000) : "-",
      "@scheduledStartDate": isStartDate ? getDate(startDate) : "-",
      "@lateRegEndDate": isRegDate ? getDate(regDate) : "-",
      "@numberLateRegEndDate": regDate,
      "@timezone": timezone,
      "@status": status,
      "@level": level,
      "@usdBid":
        currency === "CNY" ? Math.round(Number(bid) / lastValue) : Number(bid),
      "@usdPrizepool": currency === "CNY" && pp !== "-" ? pp / lastValue : pp,
      "@msStartForRule": isStartDate
        ? timeStringToMilliseconds(dateToTimeString(Number(isStartDate) * 1000))
        : "-",
      "@msLateForRule": isRegDate
        ? timeStringToMilliseconds(dateToTimeString(Number(isRegDate) * 1000))
        : "-",
    };
  });

  // фильтр по параметрам
  tournaments = tournaments.filter((tournament) => {
    const bounty = tournament["@bounty"];
    const turbo = tournament["@turbo"];
    const superturbo = tournament["@superturbo"];
    const prizepool = tournament["@usdPrizepool"];

    return (
      Number(tournament["@usdBid"]) >= Number(moneyStart) &&
      Number(tournament["@usdBid"]) <= Number(moneyEnd) &&
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
        ? Number(prizepoolStart) <= Number(prizepool) &&
          Number(prizepool) <= Number(prizepoolEnd)
        : true)
    );
  });

  console.log(tournaments);

  // определение цвета турнира
  tournaments = tournaments.map((tournament) => {
    const level = tournament["@level"];

    const { valid, ...props } = filter(level, tournament, true);

    function calculateDifficultyPercent(difficulty: number) {
      if (difficulty === 69) {
        return 0;
      } else if (difficulty > 69 && difficulty <= 89) {
        return -((difficulty - 69) / 20) * 100;
      } else if (difficulty >= 55 && difficulty < 69) {
        return ((69 - difficulty) / 14) * 100;
      } else if (difficulty > 89) {
        return -100;
      } else if (difficulty < 55) {
        return 100;
      }
    }

    return {
      ...tournament,
      valid,
      percent: calculateDifficultyPercent(Number(tournament["@ability"])),
      props,
    };
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

  console.log(tournaments);

  return tournaments;
});
