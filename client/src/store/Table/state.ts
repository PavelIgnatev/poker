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

export const $tableState = createStore<tableCellModel[] | null | undefined>(
  null
);

export const $filtredTableState = $tableState.map((tournaments) => {
  if (!tournaments) {
    return [];
  }

  const config = $config.getState();
  const filter = $filterContent.getState();
  const { ability1 } = $store.getState();

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
      "@deepstack": !!tournament["@flags"]?.includes("D"),
      "@superturbo": !!superturbo,
      "@prizepool": pp,
      "@network": network,
      "@ability": ability ? ability : "-",
      "@duration": duration ? getTimeBySec(duration) : "-",
      "@getWeekday": isStartDate ? getWeekday(startDate) : "-",
      "@scheduledStartDate": isStartDate ? getDate(startDate) : "-",
      "@lateRegEndDate": isRegDate ? getDate(regDate) : "-",
      "@numberLateRegEndDate": regDate,
      "@timezone": timezone,
      "@status": status,
      "@level": level,
      "@usdBid": Number(bid),
      "@usdPrizepool": Number(pp),
    };
  });

  // фильтр по параметрам
  tournaments = tournaments.filter((tournament) => {
    const bounty = tournament["@bounty"];
    const turbo = tournament["@turbo"];
    const superturbo = tournament["@superturbo"];
    const prizepool = tournament["@usdPrizepool"];

    console.log(bounty)

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

  // определение цвета турнира
  tournaments = tournaments.map((tournament) => {
    const level = tournament["@level"];

    const { valid } = filter(level, tournament, true);

    return { ...tournament, valid };
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

  console.log(tournaments.length);

  return tournaments;
});
