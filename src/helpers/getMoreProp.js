const { getTimeBySec } = require("./getTimeBySec");
const { isTurbo } = require("./isTurbo");
const { getNetwork } = require("./getNetwork");
const { isSuperTurbo } = require("./isSuperTurbo");
const { isRebuy } = require("./isRebuy");
const { isSat } = require("./IsSat");
const { isNormal } = require("./isNormal");

/**
 * Возвращает объект, содержащий в себе большее количество свойств
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {Object} Объект, содержащий в себе большее количество свойств
 */

const getMoreProp = (tournament) => {
  const name = tournament["@name"]?.toLowerCase();
  const network = getNetwork(tournament["@network"]);
  const stake = Number(tournament["@stake"] ?? 0);
  const rake = Number(tournament["@rake"] ?? 0);
  const bid = (stake + rake).toFixed(2);
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
          .replace("K", "000")
          .replace("M", "000000")
          .replace(".", "");
      } else if ((network === "WPN" && !sat) || network === "888Poker") {
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

  const rebuy = isRebuy(tournament);

  return {
    ...tournament,
    "@bid": bid,
    "@turbo": !!isTurbo(tournament),
    "@rebuy": rebuy,
    "@od": !!tournament["@flags"]?.includes("OD"),
    "@sat": !!sat,
    "@bounty": isNormal(tournament),
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
    "@superturbo": !!isSuperTurbo(tournament),
    "@prizepool": prizepool >= 0 ? prizepool : "-",
    "@network": network,
    "@duration": tournament["@duration"] ? getTimeBySec(tournament["@duration"]) : "-",
  };
};

module.exports = { getMoreProp };
