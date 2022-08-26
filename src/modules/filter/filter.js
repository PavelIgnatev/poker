const { getNetwork } = require("../../helpers/getNetwork");
const {
  FromTo: FromToQ,
  FromToName: FromToNameQ,
  BidGt: BidGtQ,
  BidGtName: BidGtNameQ,
  Ticket: TicketQ,
  BidName: BidNameQ,
  Name: NameQ,
  FromToGt: FromToGtQ,
  StartDay: StartDayQ,
  NotName: NotNameQ,
  Entrants: EntrantsQ,
  FLAGS: FLAGSQ,
} = require("../../helpers/curry");
const { isSuperTurbo: isSuperTurboS } = require("../../helpers/isSuperTurbo");
const { isTurbo: isTurboS } = require("../../helpers/isTurbo.js");
const { isOffpeak: isOffpeakQ } = require("../../helpers/isOffpeak");

/**
 * Возвращае true, если турнир прошел фильтрацию по правилам уровня
 * @param {string} level Конкретный уровень
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир прошел фильтрацию по правилам уровня
 */

const filter = (level, tournament) => {
  const name = tournament["@name"]?.toLowerCase(),
    network = getNetwork(tournament["@network"]),
    bid = Number(tournament["@usdBid"]),
    prizepool = Number(tournament["@prizepool"]),
    weekDay = tournament["@getWeekday"],
    FromTo = FromToQ(bid),
    FromToName = FromToNameQ(name)(bid),
    BidGt = BidGtQ(bid)(prizepool),
    BidGtName = BidGtNameQ(name)(bid)(prizepool),
    FromToGt = FromToGtQ(bid)(prizepool),
    Ticket = TicketQ(name)(bid)(tournament["@tickets"] ?? 0),
    Entrants = EntrantsQ(tournament?.["@totalEntrants"] ?? 0),
    BidName = BidNameQ(name)(bid),
    StartDay = StartDayQ(weekDay),
    Name = NameQ(name),
    NotName = NotNameQ(name),
    FLAGS = FLAGSQ(tournament);

  const isTurbo = isTurboS(tournament);
  const isOffpeak = isOffpeakQ(tournament);
  const isSuperTurbo = isSuperTurboS(tournament);
  const isKo = tournament["@bounty"];
  const isNormal = !isTurbo && !isSuperTurbo;

  if (!name) return false;

  if (FromToGt(1, 1111, 7000) && network === "WPN" && level === "7A" && isNormal && !isKo)
    return false;
  if (FromTo(1, 11111) && network === "WPN" && level === "7A" && isTurbo && !isKo) return false;
  if (FromTo(1, 11111) && network === "PS.eu" && level === "7A" && isSuperTurbo && isKo)
    return true;
  if (
    FromTo(1, 11111) &&
    network === "IP" &&
    level === "7A" &&
    isNormal &&
    isKo &&
    FLAGS("sat") &&
    network === "IP" &&
    level === "7A" &&
    isNormal &&
    isKo
  )
    return true;
  if (FromTo(1, 111111) && network === "PS.es" && level === "7A" && isNormal && !isKo) return true;
  if (FromTo(1, 11111) && network === "Party" && level === "7A" && isNormal && !isKo) return true;
  if (FromTo(1, 111111) && network === "GG" && level === "7A" && isNormal && !isKo) return true;
  if (FromTo(1, 11111) && network === "WNMX" && level === "7A" && isNormal && !isKo) return true;
  if (FromTo(1, 11111) && network === "WPN" && level === "7A" && isNormal && !isKo) return true;
  if (FromTo(1, 11111) && network === "WNMX" && level === "7A" && isTurbo && !isKo) return true;
  if (FromTo(1, 111111) && network === "WNMX" && level === "7A" && isTurbo && isKo) return true;
  if (FromTo(1, 111111) && network === "WNMX" && level === "7A" && isSuperTurbo && isKo)
    return true;
  if (FromTo(1, 111111) && network === "WNMX" && level === "7A" && isSuperTurbo && !isKo)
    return true;
  if (FromTo(1, 5) && network === "888" && level === "7A" && isNormal && !isKo) return true;
  if (FromTo(1, 5) && network === "888" && level === "7A" && isNormal && isKo) return true;
  if (FromTo(1, 11111) && network === "WNMX" && level === "7A" && isNormal && isKo) return true;
  if (FromTo(1, 200) && network === "GG" && level === "7A" && isNormal && isKo) return true;
  if (FromTo(1, 11111) && network === "Chico" && level === "7A" && isNormal && isKo) return true;
  if (FromTo(1, 111111) && network === "Chico" && level === "7A" && isNormal && !isKo) return true;
  if (FromTo(1, 11111111) && network === "Chico" && level === "7A" && isTurbo && !isKo) return true;
  if (FromTo(1, 11111111) && network === "Chico" && level === "7A" && isSuperTurbo && !isKo)
    return true;
  if (FromTo(1, 1111111) && network === "Chico" && level === "7A" && isTurbo && isKo) return true;
  if (FromTo(1, 111111) && network === "Chico" && level === "7A" && isSuperTurbo && isKo)
    return true;
  if (FromTo(1, 1111111) && network === "PS.eu" && level === "7A" && isNormal && isKo) return true;
  if (FromTo(1, 1111111) && network === "PS.eu" && level === "7A" && isNormal && !isKo) return true;
  if (FromTo(1, 111111) && network === "PS.eu" && level === "0A" && isNormal && isKo) return true;
  if (FromTo(1, 111111) && network === "PS.eu" && level === "0A" && isNormal && !isKo) return true;

  return false;
};

module.exports = {
  filter,
};
