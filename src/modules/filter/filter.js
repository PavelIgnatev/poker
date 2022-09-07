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
const { validateNumber } = require("../../helpers/validateNumber");

/**
 * Возвращае true, если турнир прошел фильтрацию по правилам уровня
 * @param {string} level Конкретный уровень
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир прошел фильтрацию по правилам уровня
 */

const filter = (ruleLevel, tournament) => {
  const name = tournament["@name"]?.toLowerCase(),
    network = getNetwork(tournament["@network"]),
    bid = Number(tournament["@usdBid"]),
    prizepool = Number(tournament["@usdPrizepool"]),
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

  const level = validateNumber(ruleLevel);
  const effmu = ruleLevel.replace(level, "").replace("-", "");

  if (!name) return false;

  if (
    FromTo(0, 3.3) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 4.5) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 4.5) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 2.2) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 4.5) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 1.5) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    Entrants(45) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 4.5) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 2.2) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 3.3) &&
    network === "888" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "2" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 3.3) &&
    network === "888" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "2" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 2) &&
    network === "PS.es" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "2" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 2) &&
    network === "PS.es" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "2" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 3.3) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(0, 3.3) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 4.4) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 4.5) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 4.5) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 3.3) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "Party" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "3" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 3.3) &&
    network === "Party" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "3" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 3) &&
    network === "888" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "3" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 3) &&
    network === "888" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "3" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 3) &&
    network === "PS.es" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "3" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 3) &&
    network === "PS.es" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "3" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "IP" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "3" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "IP" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "3" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "WNMX" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "3" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "WNMX" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "3" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5.5) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 4.4) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 4.5) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "Party" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "4" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "Party" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "4" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 3) &&
    network === "888" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "4" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 3) &&
    network === "888" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "4" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 3) &&
    network === "PS.es" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "4" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 3) &&
    network === "PS.es" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "4" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "IP" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "4" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "IP" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "4" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "WNMX" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "4" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "WNMX" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "4" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    FromTo(1, 5.5) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5.5) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "Party" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "Party" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "5" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FLAGS("rebuy") &&
    network === "888" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    FromTo(1, 6) &&
    network === "888" &&
    level === "5" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FLAGS("rebuy") &&
    network === "888" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    FromTo(1, 3) &&
    network === "888" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 3) &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "IP" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "5" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "IP" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "WNMX" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "WNMX" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "5" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5.5) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5.5) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "Party" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "6" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "Party" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "6" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6) &&
    network === "888" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "6" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6) &&
    network === "888" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "6" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5.5) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "7" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "7" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6) &&
    network === "888" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "7" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6) &&
    network === "888" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "7" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "IP" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "7" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 1.5) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    Entrants(45) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "8" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6) &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6) &&
    network === "888" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "8" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 5) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "IP" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 13.2) &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6) &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "IP" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "IP" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 6.6) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 33) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 7.5) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "10" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "10" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 13) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 13.2) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "IP" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "10" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "IP" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "10" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 33) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 33) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "11" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 13.2) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 13.2) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "IP" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "IP" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "11" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 33) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 33) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "12" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "12" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 13.2) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 13.2) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "IP" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "12" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "IP" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "12" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 33) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 33) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 13.2) &&
    network === "888" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "13" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 13.2) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "IP" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "13" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "IP" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "13" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 33) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 33) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 13.2) &&
    network === "888" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "14" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 13.2) &&
    network === "888" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "14" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "IP" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "14" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "IP" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "14" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 33) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 33) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "15" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "15" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 22) &&
    network === "PS.eu" &&
    level === "15" &&
    isNormal &&
    FLAGS("sng") &&
    network === "PS.eu" &&
    level === "15" &&
    isNormal &&
    Entrants(36) &&
    network === "PS.eu" &&
    level === "15" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 11) &&
    network === "Party" &&
    level === "15" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Party" &&
    level === "15" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 13.2) &&
    network === "888" &&
    level === "15" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "888" &&
    level === "15" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 10) &&
    network === "PS.es" &&
    level === "15" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.es" &&
    level === "15" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 20) &&
    network === "WNMX" &&
    level === "15" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WNMX" &&
    level === "15" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 20) &&
    network === "IP" &&
    level === "15" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "IP" &&
    level === "15" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 12) &&
    network === "WPN" &&
    level === "15" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "WPN" &&
    level === "15" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 33) &&
    network === "Chico" &&
    level === "15" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "Chico" &&
    level === "15" &&
    isNormal
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    BidName(33, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    BidName(33, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo
  )
    return true;
  if (
    BidName(33, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    BidGtName(11, 15000, "Saturday Rebuy") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(11, 15000, "Saturday Rebuy") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidName(33, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    BidName(33, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo
  )
    return true;
  if (
    BidGtName(11, 15000, "Saturday Rebuy") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("rebuy") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "10" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "10" &&
    isTurbo
  )
    return true;
  if (
    BidName(33, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "10" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "10" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "11" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "11" &&
    isTurbo
  )
    return true;
  if (
    BidName(33, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "11" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "11" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "12" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "12" &&
    isTurbo
  )
    return true;
  if (
    BidName(33, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "12" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "12" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "13" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "13" &&
    isTurbo
  )
    return true;
  if (
    BidName(33, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "13" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "13" &&
    isTurbo
  )
    return true;
  if (
    BidName(33, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "15" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "15" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "15" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "15" &&
    isTurbo
  )
    return true;
  if (
    BidName(11, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "14" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "14" &&
    isTurbo
  )
    return true;
  if (
    BidName(33, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "14" &&
    isTurbo &&
    FLAGS("od") &&
    network === "PS.eu" &&
    level === "14" &&
    isTurbo
  )
    return true;
  if (FLAGS("od") && network === "PS.eu" && level === "16" && effmu === "A" && isTurbo) return true;
  if (
    FromTo(1, 10000) &&
    network === "PS.eu" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sng") &&
    network === "PS.eu" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sat") &&
    network === "PS.eu" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    FromTo(1, 10000) &&
    network === "PS.eu" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sng") &&
    network === "PS.eu" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sat") &&
    network === "PS.eu" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo
  )
    return true;
  if (FromTo(1, 10000) && network === "IP" && level === "16" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 10000) && network === "Chico" && level === "16" && effmu === "A" && isNormal)
    return true;
  if (
    FromTo(1, 10000) &&
    network === "PS.es" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sat") &&
    network === "PS.es" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sng") &&
    network === "PS.es" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (FromTo(1, 10000) && network === "PS.es" && level === "16" && effmu === "A" && isNormal)
    return true;
  if (
    FromTo(1, 10000) &&
    network === "PS.es" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sat") &&
    network === "PS.es" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sng") &&
    network === "PS.es" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo
  )
    return true;
  if (
    FromTo(1, 10000) &&
    network === "Party" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sng") &&
    network === "Party" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sat") &&
    network === "Party" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo
  )
    return true;
  if (
    FromTo(1, 10000) &&
    network === "Party" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sng") &&
    network === "Party" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sat") &&
    network === "Party" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (FromTo(1, 10000) && network === "Party" && level === "16" && effmu === "A" && isNormal)
    return true;
  if (
    FromTo(1, 10000) &&
    network === "GG" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sng") &&
    network === "GG" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sat") &&
    network === "GG" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    FromTo(1, 10000) &&
    network === "GG" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sng") &&
    network === "GG" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sat") &&
    network === "GG" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo
  )
    return true;
  if (
    NotName("All-In or Fold") &&
    network === "GG" &&
    level === "16" &&
    effmu === "A" &&
    isNormal &&
    NotName("Flip & Go") &&
    network === "GG" &&
    level === "16" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (FromTo(1, 10000) && network === "888" && level === "16" && effmu === "A" && isNormal)
    return true;
  if (
    FromTo(1, 10000) &&
    network === "888" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sng") &&
    network === "888" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sat") &&
    network === "888" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    FromTo(1, 10000) &&
    network === "888" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sng") &&
    network === "888" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sat") &&
    network === "888" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo
  )
    return true;
  if (
    FromTo(1, 10000) &&
    network === "WNMX" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sng") &&
    network === "WNMX" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sat") &&
    network === "WNMX" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo
  )
    return true;
  if (
    FromTo(1, 10000) &&
    network === "WNMX" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sat") &&
    network === "WNMX" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sng") &&
    network === "WNMX" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (FromTo(2, 10000) && network === "WNMX" && level === "16" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 10000) && network === "WPN" && level === "16" && effmu === "A" && isNormal)
    return true;
  if (
    FromTo(1, 10000) &&
    network === "WPN" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sng") &&
    network === "WPN" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo &&
    FLAGS("!sat") &&
    network === "WPN" &&
    level === "16" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    FromTo(1, 10000) &&
    network === "WPN" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sng") &&
    network === "WPN" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo &&
    FLAGS("!sat") &&
    network === "WPN" &&
    level === "16" &&
    effmu === "A" &&
    isSuperTurbo
  )
    return true;
  if (
    BidName(22, "DoubleDeuce") &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    StartDay("Saturday") &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidName(10.5, "SundaySqueeze") &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (BidName(22, "DoubleDeuce") && network === "WPN" && level === "6" && effmu === "A" && isNormal)
    return true;
  if (
    FromToName(1, 109, "big") &&
    network === "PS.eu" &&
    level === "16" &&
    effmu === "B" &&
    StartDay("Sunday") &&
    network === "PS.eu" &&
    level === "16" &&
    effmu === "B"
  )
    return true;
  if (FLAGS("rebuy") && network === "PS.eu") return false;
  if (FLAGS("od") && network === "PS.eu") return false;
  if (FLAGS("sng") && network === "PS.eu") return false;
  if (FLAGS("sat") && network === "PS.eu") return false;
  if (FLAGS("rebuy") && network === "IP") return false;
  if (FLAGS("od") && network === "IP") return false;
  if (FLAGS("sng") && network === "IP") return false;
  if (FLAGS("sat") && network === "IP") return false;
  if (FLAGS("rebuy") && network === "Chico") return false;
  if (FLAGS("od") && network === "Chico") return false;
  if (FLAGS("sng") && network === "Chico") return false;
  if (FLAGS("sat") && network === "Chico") return false;
  if (FLAGS("rebuy") && network === "PS.es") return false;
  if (FLAGS("od") && network === "PS.es") return false;
  if (FLAGS("sng") && network === "PS.es") return false;
  if (FLAGS("sat") && network === "PS.es") return false;
  if (FLAGS("rebuy") && network === "Party") return false;
  if (FLAGS("od") && network === "Party") return false;
  if (FLAGS("sng") && network === "Party") return false;
  if (FLAGS("sat") && network === "Party") return false;
  if (FLAGS("rebuy") && network === "GG") return false;
  if (FLAGS("od") && network === "GG") return false;
  if (FLAGS("sng") && network === "GG") return false;
  if (FLAGS("sat") && network === "GG") return false;
  if (FLAGS("rebuy") && network === "888") return false;
  if (FLAGS("od") && network === "888") return false;
  if (FLAGS("sng") && network === "888") return false;
  if (FLAGS("sat") && network === "888") return false;
  if (FLAGS("rebuy") && network === "WNMX") return false;
  if (FLAGS("od") && network === "WNMX") return false;
  if (FLAGS("sng") && network === "WNMX") return false;
  if (FLAGS("sat") && network === "WNMX") return false;
  if (FLAGS("rebuy") && network === "WPN") return false;
  if (FLAGS("od") && network === "WPN") return false;
  if (FLAGS("sng") && network === "WPN") return false;
  if (FLAGS("sat") && network === "WPN") return false;
  if (
    Name("progressive") &&
    network === "PS.eu" &&
    level === "16" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return false;
  if (Name("[10 bb]") && network === "GG") return false;
  if (Name("Flip & Go") && network === "GG") return false;
  if (Name("All-In or Fold") && network === "GG" && level === "16" && effmu === "A") return false;
  if (BidGt(11, 50000) && network === "PS.eu" && level === "0" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(7.5, 30000) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(5.5, 20000) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(11, 100000) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(7.5, 50000) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(5.5, 35000) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(11, 100000) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(7.5, 30000) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(5.5, 25000) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(4.4, 5000) && network === "PS.eu" && level === "0" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(11, 200000) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(7.5, 50000) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(5.5, 40000) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(4.4, 8000) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 40000) &&
    network === "GG" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 30000) &&
    network === "GG" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(4.5, 7.5, 15000) &&
    network === "GG" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 80000) &&
    network === "GG" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 50000) &&
    network === "GG" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(4.5, 7.5, 20000) &&
    network === "GG" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 80000) &&
    network === "GG" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 30000) &&
    network === "GG" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(4.5, 7.5, 15000) &&
    network === "GG" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 150000) &&
    network === "GG" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 50000) &&
    network === "GG" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(4.5, 7.5, 20000) &&
    network === "GG" &&
    level === "0" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (FromTo(1, 11) && network === "GG" && level === "0" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(27, 70000) && network === "PS.eu" && level === "1" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(22, 50000) && network === "PS.eu" && level === "1" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(16.5, 30000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(11, 15000) && network === "PS.eu" && level === "1" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(7.5, 10000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(27, 150000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(22, 100000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, 50000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(11, 20000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(7.5, 15000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(22, 100000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(16.5, 50000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(11, 25000) && network === "PS.eu" && level === "1" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(22, 200000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, 100000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(11, 40000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(7.5, 22500) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(7.5, 15000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(30, 33, 60000) &&
    network === "888" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(22, 30000) && network === "888" && level === "1" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(16.5, 20000) && network === "888" && level === "1" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(22, 50000) && network === "888" && level === "1" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(16.5, 30000) && network === "888" && level === "1" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    FromToGt(30, 33, 120000) &&
    network === "888" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(22, 60000) && network === "888" && level === "1" && effmu === "A" && isNormal && !isKo)
    return true;
  if (
    BidGt(16.5, 40000) &&
    network === "888" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(22, 100000) && network === "888" && level === "1" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    BidGt(16.5, 60000) &&
    network === "888" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(22, 33, 60000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(16, 24, 40000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 15000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 6000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 4000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 2000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 150000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(16, 24, 60000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(12, 15, 30000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 15000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 8000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 4000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 25000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 15000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(4.5, 7.5, 7000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 40000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 30000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(4.5, 7.5, 15000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(30, 80000) && network === "WNMX" && level === "1" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(20, 30000) && network === "WNMX" && level === "1" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(15, 15000) && network === "WNMX" && level === "1" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(30, 150000) &&
    network === "WNMX" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(20, 50000) && network === "WNMX" && level === "1" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(15, 30000) && network === "WNMX" && level === "1" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(20, 50000) && network === "WNMX" && level === "1" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(15, 20000) && network === "WNMX" && level === "1" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(20, 100000) &&
    network === "WNMX" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(15, 40000) && network === "WNMX" && level === "1" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    FromToGt(16, 24, 40000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 15000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 6000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 4000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 2000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 60000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 15000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(16, 24, 60000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(12, 15, 30000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 15000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 8000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 4000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(16, 24, 75000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 40000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 25000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 15000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 5000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(16, 24, 150000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(12, 15, 75000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 40000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 30000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 10000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(33, 50000) && network === "PS.eu" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(27, 40000) && network === "PS.eu" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(22, 30000) && network === "PS.eu" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(16.5, 20000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(11, 10000) && network === "PS.eu" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(33, 100000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(27, 70000) && network === "PS.eu" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(22, 50000) && network === "PS.eu" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(16.5, 30000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(11, 15000) && network === "PS.eu" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(7.5, 10000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(33, 100000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 70000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(22, 40000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, 25000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(11, 12000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, 200000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 150000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(22, 100000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, 50000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(11, 20000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(7.5, 15000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(30, 33, 40000) &&
    network === "888" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(22, 10000) && network === "888" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(16.5, 5000) && network === "888" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    FromToGt(30, 33, 80000) &&
    network === "888" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(22, 20000) && network === "888" && level === "2" && effmu === "A" && isNormal && !isKo)
    return true;
  if (
    BidGt(16.5, 10000) &&
    network === "888" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(30, 33, 60000) &&
    network === "888" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(22, 30000) && network === "888" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(16.5, 20000) && network === "888" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    FromToGt(30, 33, 120000) &&
    network === "888" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(22, 60000) && network === "888" && level === "2" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    BidGt(16.5, 40000) &&
    network === "888" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 150000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 50000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(16, 24, 30000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 10000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 250000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 100000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(16, 24, 40000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(12, 15, 20000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 60000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(16, 24, 40000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 15000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(1050, 800000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 200000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 6000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 4000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 2000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 150000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 8000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(16, 24, 60000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(1050, 750000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(12, 15, 30000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 300000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 120000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 15000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 8000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 4000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(1050, 400000) &&
    network === "Party" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 150000) &&
    network === "Party" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 5000) &&
    network === "Party" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(30, 50000) && network === "PS.es" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(20, 25000) && network === "PS.es" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(10, 7500) && network === "PS.es" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(30, 100000) &&
    network === "PS.es" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(20, 40000) &&
    network === "PS.es" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(10, 12000) &&
    network === "PS.es" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 15000) &&
    network === "Party" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(30, 100000) &&
    network === "PS.es" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(20, 50000) && network === "PS.es" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(10, 12500) && network === "PS.es" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(30, 200000) &&
    network === "PS.es" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(20, 100000) &&
    network === "PS.es" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(10, 20000) &&
    network === "PS.es" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(1050, 600000) &&
    network === "Party" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 200000) &&
    network === "Party" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 120000) &&
    network === "Party" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 25000) &&
    network === "Party" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "Party" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 25000) &&
    network === "888" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(50, 75000) && network === "WNMX" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(40, 35000) && network === "WNMX" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(30, 25000) && network === "WNMX" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(50, 125000) &&
    network === "WNMX" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(40, 50000) && network === "WNMX" && level === "2" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(30, 40000) && network === "WNMX" && level === "2" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(30, 80000) && network === "WNMX" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(20, 30000) && network === "WNMX" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(15, 15000) && network === "WNMX" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(30, 150000) &&
    network === "WNMX" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 400000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(20, 50000) && network === "WNMX" && level === "2" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    FromToGt(576, 750, 150000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(15, 30000) && network === "WNMX" && level === "2" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 5000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 600000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 250000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 300000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 50000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(16, 24, 30000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 10000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 25000) &&
    network === "WNMX" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 200000) &&
    network === "WNMX" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 35000) &&
    network === "WNMX" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 25000) &&
    network === "WNMX" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 600000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 200000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 100000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(16, 24, 40000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 600000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 20000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 200000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 60000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(16, 24, 40000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 15000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 6000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 4000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 25000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 2000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 150000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 750000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(16, 24, 60000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 300000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(12, 15, 30000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 15000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 8000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 4000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 1500000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 2500000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, 300000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, 500000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, 100000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, 160000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(33, 40000) && network === "PS.eu" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(33, 75000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(27, 25000) && network === "PS.eu" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(27, 50000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(22, 15000) && network === "PS.eu" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(22, 30000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, 10000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(16.5, 20000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(33, 50000) && network === "PS.eu" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(27, 40000) && network === "PS.eu" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(22, 30000) && network === "PS.eu" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(16.5, 20000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(11, 10000) && network === "PS.eu" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(33, 100000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 70000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(22, 40000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, 25000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(11, 12000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(1050, 600000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 200000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 8000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(1050, 750000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 300000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 120000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(1050, 750000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 300000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(1050, 1000000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 500000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 200000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, 250000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, 100000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(33, 40000) && network === "Party" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(27, 25000) && network === "Party" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(22, 15000) && network === "Party" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(16.5, 10000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(1050, 400000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 150000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 25000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, 500000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, 160000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 5000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(33, 75000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 50000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(1050, 600000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(22, 30000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 200000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 120000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, 20000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(33, 50000) && network === "Party" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(27, 40000) && network === "Party" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(22, 30000) && network === "Party" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(16.5, 20000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(11, 10000) && network === "Party" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(1050, 600000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(33, 100000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 250000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(27, 70000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(22, 40000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 150000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 35000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(16.5, 25000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(11, 12000) &&
    network === "Party" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(1050, 1000000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 400000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(55, 150000) && network === "888" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 200000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(44, 60000) && network === "888" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 30000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(30, 33, 20000) &&
    network === "888" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(22, 5000) && network === "888" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(55, 300000) && network === "888" && level === "3" && effmu === "A" && isNormal && !isKo)
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(44, 100000) && network === "888" && level === "3" && effmu === "A" && isNormal && !isKo)
    return true;
  if (
    FromToGt(30, 33, 40000) &&
    network === "888" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(22, 10000) && network === "888" && level === "3" && effmu === "A" && isNormal && !isKo)
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 15000) &&
    network === "888" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 200000) &&
    network === "888" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(30, 33, 40000) &&
    network === "888" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 125000) &&
    network === "888" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(22, 10000) && network === "888" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 40000) &&
    network === "888" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(16.5, 5000) && network === "888" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    FromToGt(30, 33, 80000) &&
    network === "888" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(22, 20000) && network === "888" && level === "3" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    BidGt(16.5, 10000) &&
    network === "888" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 5000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 75000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 75000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 15000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 125000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 15000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 400000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(576, 750, 150000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 5000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 600000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 250000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 275, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 600000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(576, 750, 400000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 200000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 1000000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 600000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 350000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 159, isOffpeak ? 0 : 30000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 30000) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 200000) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 25000) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 150000) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 60000) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 250000) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 135000) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 85000) &&
    network === "WNMX" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 600000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(576, 750, 200000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 25000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 750000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 300000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 600000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(576, 750, 400000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 200000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 1000000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 600000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 350000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, 200000) &&
    network === "PS.es" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(30, 40000) && network === "PS.es" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(20, 12500) && network === "PS.es" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(50, 400000) &&
    network === "PS.es" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(30, 75000) &&
    network === "PS.es" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(20, 25000) &&
    network === "PS.es" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(30, 50000) && network === "PS.es" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(20, 25000) && network === "PS.es" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(30, 100000) &&
    network === "PS.es" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(20, 40000) &&
    network === "PS.es" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 750000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 550000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 250000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 100000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 27000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(16, 24, 12500) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 1500000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 1000000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 500000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 150000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 50000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(16, 24, 20000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 400000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 150000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 50000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(16, 24, 30000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 10000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 750000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 250000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 100000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(16, 24, 40000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(12, 15, 20000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(70, 125000) && network === "WNMX" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(50, 40000) && network === "WNMX" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(40, 30000) && network === "WNMX" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(30, 20000) && network === "WNMX" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(70, 200000) &&
    network === "WNMX" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(50, 60000) && network === "WNMX" && level === "3" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(40, 40000) && network === "WNMX" && level === "3" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(30, 30000) && network === "WNMX" && level === "3" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(50, 75000) && network === "WNMX" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(40, 35000) && network === "WNMX" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(30, 25000) && network === "WNMX" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(50, 125000) &&
    network === "WNMX" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(40, 50000) && network === "WNMX" && level === "3" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(30, 40000) && network === "WNMX" && level === "3" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    FromToGt(80, 120, 600000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 450000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 200000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 80000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 20000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(17, 24, 10000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 1200000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 800000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 400000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 40000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(17, 24, 15000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 300000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 40000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(17, 24, 25000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 600000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 200000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 80000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(17, 24, 30000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 600000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, 500000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 200000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 80000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 48000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 1000000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 750000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 350000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 125000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 88000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 36000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 100000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 150000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 80000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 120000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 80000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 20000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 36000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 100000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 150000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 60000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 30000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 60000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 40000) &&
    network === "Party" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(215, 300000) && network === "888" && level === "8" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(215, 500000) &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 250000) &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 40000) &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 40000) &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(109, 100000) && network === "888" && level === "8" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(109, 150000) &&
    network === "888" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 60000) &&
    network === "888" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 500000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 750000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 150000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 250000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 100000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 150000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 20000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 750000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 1000000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, 200000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, 300000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, 150000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, 200000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 20000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 700000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 1000000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, 500000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, 750000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 200000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 350000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 125000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 25000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 250000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 400000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 100000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 100000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(1050, 750000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 30000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 60000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 300000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(1050, 1000000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 500000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 40000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 200000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(530, 500000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 200000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 75000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(530, 750000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 300000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, 250000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, 350000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 75000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 125000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 20000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(100, 80000) && network === "WNMX" && level === "8" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(100, 125000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 40000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 80000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 10000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 5000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 10000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 700000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 1000000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, 500000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, 750000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 200000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 350000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 125000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(1050, 600000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 250000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 150000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 35000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 25000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(1050, 1000000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(530, isOffpeak ? 0 : 400000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 200000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 10000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 30000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 250000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 400000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 100000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 150000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(530, 400000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 60000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 200000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 70000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 10000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 20000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 15000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 10000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(530, 600000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 300000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 30000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 20000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 15000) &&
    network === "888" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, isOffpeak ? 0 : 200000) &&
    network === "888" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 125000) &&
    network === "888" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 40000) &&
    network === "888" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 200000) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 25000) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 5000) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 300000) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 175000) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 40000) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 75000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 15000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 125000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 15000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 100000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 20000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 175000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 30000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 600000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(576, 750, 400000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 200000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 1000000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 600000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 350000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 30000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, 300000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 150000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(84, 120, isOffpeak ? 0 : 15000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, 500000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 300000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(84, 120, isOffpeak ? 0 : 30000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 150000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 60000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 250000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 135000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 85000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(500, 300000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 135000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 80000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, 500000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 190000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 110000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 22000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 600000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(576, 750, 400000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 200000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 1000000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 600000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 350000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, 300000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 150000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 75000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(84, 120, isOffpeak ? 0 : 15000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, 500000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 300000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(84, 120, isOffpeak ? 0 : 24000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 600000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 1000000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 400000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, 500000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 160000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 250000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 80000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 80000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 600000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 1000000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 500000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, 750000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 200000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 350000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 80000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 125000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 48000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 88000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 36000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 80000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 120000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 80000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 15000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 40000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 80000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 120000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 80000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 20000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 36000) &&
    network === "Party" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(250, 450000) && network === "888" && level === "9" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(250, 600000) &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 200000) &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 300000) &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 25000) &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(215, 300000) && network === "888" && level === "9" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(215, 500000) &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 250000) &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 40000) &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 40000) &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 450000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 600000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 100000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 200000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 70000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 125000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 15000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, 40000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 500000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 750000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 150000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 250000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 100000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 150000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 20000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 500000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 750000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, 400000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, 500000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 250000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 120000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 65000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(52.2, 66, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(52.2, 66, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 700000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 1000000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, 500000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, 750000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 200000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 350000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 125000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 25000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 375000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 500000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, 200000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, 300000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, 250000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, 350000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 75000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 125000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 20000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 500000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 750000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, 400000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, 500000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 250000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 120000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 65000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 700000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 1000000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, 500000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, 750000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 200000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 350000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 125000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 25000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 10000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 750000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, 150000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(44, 80000) && network === "PS.eu" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(33, 15000) && network === "PS.eu" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(27, 12500) && network === "PS.eu" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(22, 8000) && network === "PS.eu" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(109, 1500000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, 300000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, 150000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, 40000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 30000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(22, 20000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 1000000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, 250000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, 100000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(33, 40000) && network === "PS.eu" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(27, 25000) && network === "PS.eu" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(22, 15000) && network === "PS.eu" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(16.5, 10000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 2000000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, 500000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, 160000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, 75000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 50000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(22, 30000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, 20000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, 150000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(44, 80000) && network === "Party" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(33, 15000) && network === "Party" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(27, 12500) && network === "Party" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(22, 8000) && network === "Party" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    FromToGt(55, 66, 300000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, 150000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, 40000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 30000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(22, 20000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, 250000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, 100000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(33, 40000) && network === "Party" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(27, 25000) && network === "Party" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(22, 15000) && network === "Party" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(16.5, 10000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, 500000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, 160000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, 75000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 50000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(22, 30000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, 20000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(55, 75000) && network === "888" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(44, 40000) && network === "888" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    FromToGt(30, 33, 10000) &&
    network === "888" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(55, 150000) && network === "888" && level === "4" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(44, 80000) && network === "888" && level === "4" && effmu === "A" && isNormal && !isKo)
    return true;
  if (
    FromToGt(30, 33, 20000) &&
    network === "888" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(55, 150000) && network === "888" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(44, 60000) && network === "888" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    FromToGt(30, 33, 20000) &&
    network === "888" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(22, 5000) && network === "888" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(55, 300000) && network === "888" && level === "4" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(44, 100000) && network === "888" && level === "4" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    FromToGt(30, 33, 40000) &&
    network === "888" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(22, 10000) && network === "888" && level === "4" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    BidGt(50, 125000) &&
    network === "PS.es" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(30, 15000) && network === "PS.es" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(20, 5000) && network === "PS.es" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(50, 250000) &&
    network === "PS.es" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(30, 35000) &&
    network === "PS.es" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(20, 15000) &&
    network === "PS.es" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, 200000) &&
    network === "PS.es" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(30, 40000) && network === "PS.es" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(20, 12500) && network === "PS.es" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(50, 400000) &&
    network === "PS.es" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(30, 75000) &&
    network === "PS.es" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(20, 25000) &&
    network === "PS.es" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 500000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 300000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 150000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 60000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 12500) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 1000000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 600000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 300000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 100000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 30000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, 150000) &&
    network === "WNMX" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(70, 100000) && network === "WNMX" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(50, 25000) && network === "WNMX" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(40, 20000) && network === "WNMX" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(30, 15000) && network === "WNMX" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(100, 250000) &&
    network === "WNMX" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(70, 150000) &&
    network === "WNMX" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(50, 40000) && network === "WNMX" && level === "4" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(40, 25000) && network === "WNMX" && level === "4" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(30, 20000) && network === "WNMX" && level === "4" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(70, 125000) && network === "WNMX" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(50, 40000) && network === "WNMX" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(40, 30000) && network === "WNMX" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(70, 200000) &&
    network === "WNMX" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(50, 60000) && network === "WNMX" && level === "4" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(40, 40000) && network === "WNMX" && level === "4" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(30, 30000) && network === "WNMX" && level === "4" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(30, 20000) && network === "WNMX" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    FromToGt(80, 120, 400000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 250000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 120000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 50000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 10000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 500000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 250000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 80000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 28000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 800000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 600000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 450000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 200000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 80000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 20000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(17, 24, 10000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 1200000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 800000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 400000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 40000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(17, 24, 16000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 350000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, 180000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, 100000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(44, 40000) && network === "PS.eu" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(33, 10000) && network === "PS.eu" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(27, 7500) && network === "PS.eu" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(109, 600000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, 320000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, 175000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, 80000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, 25000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 15000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 500000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, 150000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(44, 80000) && network === "PS.eu" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(33, 15000) && network === "PS.eu" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(27, 12500) && network === "PS.eu" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(22, 8000) && network === "PS.eu" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(109, 1000000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, 300000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, 150000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, 40000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 30000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(22, 20000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, 100000) &&
    network === "Party" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(44, 30000) && network === "Party" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(33, 10000) && network === "Party" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    FromToGt(55, 66, 160000) &&
    network === "Party" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, 75000) &&
    network === "Party" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, 25000) &&
    network === "Party" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, 150000) &&
    network === "Party" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(44, 80000) && network === "Party" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(33, 15000) && network === "Party" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(27, 12500) && network === "Party" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    FromToGt(55, 66, 300000) &&
    network === "Party" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, 150000) &&
    network === "Party" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, 40000) &&
    network === "Party" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 30000) &&
    network === "Party" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(109, 250000) && network === "888" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(88, 150000) && network === "888" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(55, 40000) && network === "888" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(44, 30000) && network === "888" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    FromToGt(30, 33, 5000) &&
    network === "888" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 500000) &&
    network === "888" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(88, 250000) && network === "888" && level === "5" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(55, 100000) && network === "888" && level === "5" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(44, 75000) && network === "888" && level === "5" && effmu === "A" && isNormal && !isKo)
    return true;
  if (
    FromToGt(30, 33, 10000) &&
    network === "888" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(55, 75000) && network === "888" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(44, 40000) && network === "888" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    FromToGt(30, 33, 10000) &&
    network === "888" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(55, 150000) && network === "888" && level === "5" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(44, 80000) && network === "888" && level === "5" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    FromToGt(30, 33, 20000) &&
    network === "888" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, 250000) &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, 250000) &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(50, 75000) && network === "PS.es" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(30, 10000) && network === "PS.es" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(125, 500000) &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, 500000) &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, 125000) &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(30, 25000) &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, 125000) &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(30, 15000) && network === "PS.es" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(20, 5000) && network === "PS.es" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(50, 250000) &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(30, 35000) &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(20, 15000) &&
    network === "PS.es" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 300000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 175000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 100000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 40000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 10000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 500000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 375000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 175000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 80000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 20000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 400000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 150000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 60000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 12500) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 800000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 600000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 300000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 100000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 30000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 300000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, 125000) &&
    network === "WNMX" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(70, 80000) && network === "WNMX" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(50, 20000) && network === "WNMX" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(40, 15000) && network === "WNMX" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(100, 200000) &&
    network === "WNMX" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(70, 120000) &&
    network === "WNMX" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(50, 25000) && network === "WNMX" && level === "5" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(40, 20000) && network === "WNMX" && level === "5" && effmu === "A" && isNormal && !isKo)
    return true;
  if (
    BidGt(100, 150000) &&
    network === "WNMX" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(70, 100000) && network === "WNMX" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(50, 25000) && network === "WNMX" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(40, 20000) && network === "WNMX" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(30, 15000) && network === "WNMX" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(100, 250000) &&
    network === "WNMX" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(70, 150000) &&
    network === "WNMX" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(50, 40000) && network === "WNMX" && level === "5" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(40, 25000) && network === "WNMX" && level === "5" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(30, 20000) && network === "WNMX" && level === "5" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 140000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 80000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 32000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 6000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 400000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 300000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 120000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 65000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 12000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 300000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 250000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 120000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 50000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 10000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 650000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 500000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 250000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 80000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 28000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 400000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 600000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 200000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 300000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 120000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 200000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 600000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 1000000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 400000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 500000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, 160000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 250000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 120000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, 50000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 80000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, 20000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 200000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 300000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 30000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 60000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 10000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 25000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 80000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 120000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 80000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 15000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 40000) &&
    network === "Party" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 300000) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 400000) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 250000) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 15000) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 5000) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 450000) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 600000) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 200000) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 300000) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 25000) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 300000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 400000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 75000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 150000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 60000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 100000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 450000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 600000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 100000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 200000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 70000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 125000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 15000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 40000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 300000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 500000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 200000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 300000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 120000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 200000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 200000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 45000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(52.5, 66, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(52.5, 66, isOffpeak ? 0 : 25000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 500000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 750000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, 400000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, 500000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 250000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 120000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 65000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(52.5, 66, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(52.5, 66, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 250000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 312000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 150000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 200000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 40000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 80000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 375000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 500000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, 200000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, 300000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 150000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 6000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 300000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 250000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 175000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 300000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 500000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 200000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 350000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 300000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 120000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 180000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 200000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 7500) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 600000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 175000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 80000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 45000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 10000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 25000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 320000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 500000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 750000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, 400000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, 500000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 250000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 120000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 65000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 150000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 20000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 250000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 175000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 90000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 350000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 180000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 30000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 5000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 600000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 320000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 160000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 75000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 25000) &&
    network === "Party" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(109, 150000) && network === "888" && level === "6" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 250000) &&
    network === "888" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(109, 250000) && network === "888" && level === "6" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 40000) &&
    network === "888" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(30, 33, isOffpeak ? 0 : 5000) &&
    network === "888" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 500000) &&
    network === "888" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 250000) &&
    network === "888" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(30, 33, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 1000000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, 250000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, 200000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 40000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 5000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 1500000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, 400000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, 300000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 75000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 15000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, 350000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, 250000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 75000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, 500000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, 500000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 125000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 150000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 25000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(28, 33, isOffpeak ? 0 : 6000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 175000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 200000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 75000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 12000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(28, 33, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 300000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 300000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 175000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 500000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 375000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 300000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 175000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 12000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 375000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 250000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 70000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 28000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 300000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 12000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 375000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 250000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 70000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 28000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, 100000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 60000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 10000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, 150000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 20000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 400000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 200000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 120000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 600000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 300000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(162, isOffpeak ? 0 : 200000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 200000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 70000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 20000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 12000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 10000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 300000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 30000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 20000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 300000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 150000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 40000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 20000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 15000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 375000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 200000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 75000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 40000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 30000) &&
    network === "Party" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 300000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 150000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 40000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 20000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 15000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 375000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 200000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 75000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 40000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 30000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 200000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 30000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 10000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, 300000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 60000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 25000) &&
    network === "Party" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 200000) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 25000) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 12000) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 6000) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 300000) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 175000) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 40000) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 300000) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 200000) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 40000) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 15000) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 5000) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 375000) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 300000) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 60000) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(320, 300000) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 200000) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 40000) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 15000) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 5000) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(320, 375000) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 300000) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 60000) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 300000) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 15000) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 5000) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 400000) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 250000) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(160, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 100000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 20000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 175000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 30000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 200000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 300000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 100000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 200000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, 100000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 300000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 300000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 75000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 60000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 400000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, isOffpeak ? 0 : 150000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 100000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, 300000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 150000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(84, 120, isOffpeak ? 0 : 15000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, 500000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 300000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(84, 120, isOffpeak ? 0 : 30000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 200000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 15000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 400000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 250000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 30000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 200000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 15000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 400000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 250000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 30000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 300000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 200000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 120000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(52.5, 66, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 500000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 300000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 200000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 45000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(52.5, 66, isOffpeak ? 0 : 25000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(500, 300000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 135000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 80000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, 500000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 190000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 110000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 22000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 180000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 110000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 225000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 150000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 30000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 180000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 110000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 225000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 150000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 30000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 250000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 150000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 40000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 312000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 200000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 80000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 200000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 15000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 10000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 400000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 250000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 75000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 300000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 200000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 120000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 10000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 500000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 300000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 200000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 45000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 25000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, 300000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 150000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 75000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(84, 120, isOffpeak ? 0 : 15000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, 500000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 300000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(84, 120, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 200000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 15000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 10000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 400000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 250000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 75000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 100000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, 125000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 80000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 20000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, 200000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 25000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 20000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 150000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 25000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(28, 33, isOffpeak ? 0 : 6000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 175000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(28, 33, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 140000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 32000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, isOffpeak ? 0 : 6000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 400000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 300000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 120000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 65000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, isOffpeak ? 0 : 12000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 150000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 200000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 150000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 175000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 6000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 250000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 100000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 60000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 30000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 150000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 60000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 40000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 150000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 100000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 20000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 250000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(77, 88, isOffpeak ? 0 : 175000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(55, 66, isOffpeak ? 0 : 90000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(109, 100000) && network === "888" && level === "7" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 60000) &&
    network === "888" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "888" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 150000) &&
    network === "888" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(109, 150000) && network === "888" && level === "7" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 100000) &&
    network === "888" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 30000) &&
    network === "888" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 20000) &&
    network === "888" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 250000) &&
    network === "888" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 150000) &&
    network === "888" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 75000) &&
    network === "888" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 50000) &&
    network === "888" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 750000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, 200000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, 150000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 20000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 1000000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, 300000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, 200000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, 1000000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(125, 250000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, 200000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 40000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 5000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, 1500000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(125, 400000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, 300000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 75000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 15000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 250000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 100000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 30000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 400000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 150000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 60000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 150000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 25000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 175000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(100, 80000) && network === "WNMX" && level === "7" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 40000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 10000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 5000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, 125000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 80000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 10000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, 100000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 60000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 10000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, 150000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 20000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 15000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 250000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 100000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 10000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 400000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 150000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 60000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 150000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 25000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 175000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(30, 80000) && network === "IP" && level === "1" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(20, 30000) && network === "IP" && level === "1" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(15, 15000) && network === "IP" && level === "1" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(30, 150000) && network === "IP" && level === "1" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(20, 50000) && network === "IP" && level === "1" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(15, 30000) && network === "IP" && level === "1" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(20, 50000) && network === "IP" && level === "1" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(15, 20000) && network === "IP" && level === "1" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(20, 100000) && network === "IP" && level === "1" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(15, 40000) && network === "IP" && level === "1" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    FromToGt(16, 24, 40000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 15000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 6000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 4000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 2000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 60000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 15000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(16, 24, 60000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(12, 15, 30000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 15000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 8000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 4000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(16, 24, 75000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 40000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 25000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 15000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 5000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(16, 24, 150000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(12, 15, 75000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 40000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 30000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 10000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(50, 75000) && network === "IP" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(40, 35000) && network === "IP" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(30, 25000) && network === "IP" && level === "2" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(50, 125000) && network === "IP" && level === "2" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(40, 50000) && network === "IP" && level === "2" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(30, 40000) && network === "IP" && level === "2" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(30, 80000) && network === "IP" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(20, 30000) && network === "IP" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(15, 15000) && network === "IP" && level === "2" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(30, 150000) && network === "IP" && level === "2" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(20, 50000) && network === "IP" && level === "2" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(15, 30000) && network === "IP" && level === "2" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    FromToGt(50, 66, 300000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 50000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(16, 24, 30000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 10000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 25000) &&
    network === "IP" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 200000) &&
    network === "IP" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 35000) &&
    network === "IP" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 25000) &&
    network === "IP" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 600000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 200000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 100000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(16, 24, 40000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 600000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 20000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 200000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 60000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(16, 24, 40000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(12, 15, 15000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 6000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 4000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 25000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 2000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 150000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 750000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(16, 24, 60000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 300000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(12, 15, 30000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.8, 11, 15000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(7.7, 8.4, 8000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.6, 7.6, 4000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 30000) &&
    network === "IP" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 200000) &&
    network === "IP" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 25000) &&
    network === "IP" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 150000) &&
    network === "IP" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 60000) &&
    network === "IP" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 250000) &&
    network === "IP" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 135000) &&
    network === "IP" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 85000) &&
    network === "IP" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 600000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(576, 750, 200000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 25000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 750000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 300000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 600000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(576, 750, 400000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 200000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 1000000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 600000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 350000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(70, 125000) && network === "IP" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(50, 40000) && network === "IP" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(40, 30000) && network === "IP" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(30, 20000) && network === "IP" && level === "3" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(70, 200000) && network === "IP" && level === "3" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(50, 60000) && network === "IP" && level === "3" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(40, 40000) && network === "IP" && level === "3" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(30, 30000) && network === "IP" && level === "3" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(50, 75000) && network === "IP" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(40, 35000) && network === "IP" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(30, 25000) && network === "IP" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(50, 125000) && network === "IP" && level === "3" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(40, 50000) && network === "IP" && level === "3" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(30, 40000) && network === "IP" && level === "3" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    FromToGt(80, 120, 600000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 450000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 200000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 80000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 20000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(17, 24, 10000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 1200000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 800000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 400000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 40000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(17, 24, 15000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 300000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 40000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(17, 24, 25000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 600000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 200000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 80000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(17, 24, 30000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(200, 250000) && network === "IP" && level === "8" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(200, 350000) && network === "IP" && level === "8" && effmu === "A" && isNormal && !isKo)
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 75000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 125000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 20000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(100, 80000) && network === "IP" && level === "8" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(100, 125000) && network === "IP" && level === "8" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 40000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 80000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 10000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 5000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 10000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 700000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 1000000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, 500000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, 750000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 200000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 350000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 125000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 25000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 10000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 250000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 400000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 100000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 150000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 60000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 10000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 150000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 60000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, isOffpeak ? 0 : 250000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 135000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 85000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(500, 300000) && network === "IP" && level === "13" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 135000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 80000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, 500000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 190000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 110000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 22000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 600000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(576, 750, 400000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 200000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 10000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(751, 1050, 1000000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(576, 750, 600000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, isOffpeak ? 0 : 350000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, 300000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 150000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 75000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(84, 120, isOffpeak ? 0 : 15000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, 500000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 300000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(84, 120, isOffpeak ? 0 : 24000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(250, 375000) && network === "IP" && level === "9" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(250, 500000) && network === "IP" && level === "9" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(200, 200000) && network === "IP" && level === "9" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(200, 300000) && network === "IP" && level === "9" && effmu === "A" && isNormal && !isKo)
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(200, 250000) && network === "IP" && level === "9" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(200, 350000) && network === "IP" && level === "9" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 75000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 125000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 20000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 500000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 750000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, 400000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, 500000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 250000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 120000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 65000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 700000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 1000000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, 500000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, 750000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 200000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 350000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 125000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 25000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 10000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(100, 150000) && network === "IP" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(70, 100000) && network === "IP" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(50, 25000) && network === "IP" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(40, 20000) && network === "IP" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(30, 15000) && network === "IP" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(100, 250000) && network === "IP" && level === "4" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(70, 150000) && network === "IP" && level === "4" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(50, 40000) && network === "IP" && level === "4" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(40, 25000) && network === "IP" && level === "4" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(30, 20000) && network === "IP" && level === "4" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(70, 125000) && network === "IP" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(50, 40000) && network === "IP" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(40, 30000) && network === "IP" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(70, 200000) && network === "IP" && level === "4" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(50, 60000) && network === "IP" && level === "4" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(40, 40000) && network === "IP" && level === "4" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(30, 30000) && network === "IP" && level === "4" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(30, 20000) && network === "IP" && level === "4" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    FromToGt(80, 120, 400000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 250000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 120000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 50000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 10000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 500000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 250000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 80000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 28000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 800000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 600000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 450000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 200000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 80000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 20000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(17, 24, 10000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 1200000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 800000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 400000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 40000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(17, 24, 16000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(100, 125000) && network === "IP" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(70, 80000) && network === "IP" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(50, 20000) && network === "IP" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(40, 15000) && network === "IP" && level === "5" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(100, 200000) && network === "IP" && level === "5" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(70, 120000) && network === "IP" && level === "5" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(50, 25000) && network === "IP" && level === "5" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(40, 20000) && network === "IP" && level === "5" && effmu === "A" && isNormal && !isKo)
    return true;
  if (BidGt(100, 150000) && network === "IP" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(70, 100000) && network === "IP" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(50, 25000) && network === "IP" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(40, 20000) && network === "IP" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(30, 15000) && network === "IP" && level === "5" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(100, 250000) && network === "IP" && level === "5" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(70, 150000) && network === "IP" && level === "5" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(50, 40000) && network === "IP" && level === "5" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(40, 25000) && network === "IP" && level === "5" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(30, 20000) && network === "IP" && level === "5" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 140000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 80000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 32000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 6000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 400000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 300000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 120000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 65000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 12000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 300000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 250000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 120000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 50000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, 10000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 650000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 500000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 250000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 80000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, 28000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 250000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 312000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 150000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 200000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 40000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 80000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(250, 375000) && network === "IP" && level === "10" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(250, 500000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(200, 200000) && network === "IP" && level === "10" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(200, 300000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 300000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 500000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 200000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 300000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 120000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 200000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 45000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 10000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 25000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 500000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 750000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, 400000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, 500000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 250000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 120000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 65000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(100, 100000) && network === "IP" && level === "6" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 60000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 10000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(100, 150000) && network === "IP" && level === "6" && effmu === "A" && isNormal && !isKo)
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 20000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(500, 300000) && network === "IP" && level === "12" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 135000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 80000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(500, 500000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 190000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 110000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 22000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 180000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 110000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 225000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 150000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 30000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 180000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 110000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 225000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 150000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 30000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 250000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 150000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 40000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(250, isOffpeak ? 0 : 312000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(200, isOffpeak ? 0 : 200000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 80000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 200000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 15000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 10000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 400000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 250000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 75000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 300000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 200000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 120000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 10000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 500000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 300000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 200000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 45000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(56, 66, isOffpeak ? 0 : 25000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(376, 575, 300000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 150000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 75000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(84, 120, isOffpeak ? 0 : 15000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(376, 575, 500000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 300000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(84, 120, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(256, 375, 200000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 15000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 10000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(256, 375, 400000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(151, 255, isOffpeak ? 0 : 250000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 75000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(100, 125000) && network === "IP" && level === "6" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 80000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 20000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(100, 200000) && network === "IP" && level === "6" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 25000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 20000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 150000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 25000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(28, 33, isOffpeak ? 0 : 6000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 175000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(28, 33, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 140000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 32000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(25, 33, isOffpeak ? 0 : 6000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 400000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 300000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 120000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 65000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(25, 33, isOffpeak ? 0 : 12000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(100, 80000) && network === "IP" && level === "7" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 40000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 10000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 5000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(100, 125000) && network === "IP" && level === "7" && effmu === "A" && isNormal && !isKo)
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 80000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 10000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(100, 100000) && network === "IP" && level === "7" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 60000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 10000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(100, 150000) && network === "IP" && level === "7" && effmu === "B" && isNormal && !isKo)
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 20000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 15000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 250000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 100000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 10000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 400000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 150000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 60000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 150000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 25000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 175000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 10000) &&
    network === "PS.eu" &&
    level === "16" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, 10000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 8001) &&
    network === "PS.eu" &&
    level === "16" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGt(16.5, 50000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(11, 25000) && network === "PS.eu" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 15000) && network === "PS.eu" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(5.5, 7500) && network === "PS.eu" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(4.4, 5000) && network === "PS.eu" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(3.3, 3000) && network === "PS.eu" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(16.5, 80000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(11, 40000) && network === "PS.eu" && level === "1" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(7.5, 22000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(5.5, 10000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(4.4, 6500) && network === "PS.eu" && level === "1" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(3.3, 5000) && network === "PS.eu" && level === "1" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(7.5, 25000) && network === "PS.eu" && level === "1" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(5.5, 14000) && network === "PS.eu" && level === "1" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(4.4, 9000) && network === "PS.eu" && level === "1" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(3.3, 5000) && network === "PS.eu" && level === "1" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(7.5, 40000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(5.5, 22000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(4.4, 13000) &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(3.3, 6600) && network === "PS.eu" && level === "1" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 35000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 25000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 20000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 5000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 50000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 35000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 25000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 10000) &&
    network === "GG" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(20, 75000) && network === "WNMX" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(15, 30000) && network === "WNMX" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(10, 15000) && network === "WNMX" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 7500) && network === "WNMX" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(20, 120000) && network === "WNMX" && level === "1" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 60000) && network === "WNMX" && level === "1" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 30000) && network === "WNMX" && level === "1" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(7.5, 15000) && network === "WNMX" && level === "1" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 50000) && network === "WNMX" && level === "1" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(10, 30000) && network === "WNMX" && level === "1" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 15000) && network === "WNMX" && level === "1" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(15, 75000) && network === "WNMX" && level === "1" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 50000) && network === "WNMX" && level === "1" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(7.5, 25000) && network === "WNMX" && level === "1" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 35000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 25000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 20000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 5000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 50000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 35000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 25000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 10000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 40000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 25000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 9000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 75000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 40000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 13000) &&
    network === "WPN" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(27, 100000) && network === "PS.eu" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(22, 60000) && network === "PS.eu" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(16.5, 35000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(11, 20000) && network === "PS.eu" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 10000) && network === "PS.eu" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(5.5, 5000) && network === "PS.eu" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(4.4, 3000) && network === "PS.eu" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(27, 130000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(22, 80000) && network === "PS.eu" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(16.5, 50000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(11, 25000) && network === "PS.eu" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(7.5, 15000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(5.5, 7.5) && network === "PS.eu" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(4.4, 5000) && network === "PS.eu" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(16.5, 50000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(11, 25000) && network === "PS.eu" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 15000) && network === "PS.eu" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(5.5, 7500) && network === "PS.eu" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(4.4, 5000) && network === "PS.eu" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(3.3, 3000) && network === "PS.eu" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(16.5, 80000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(11, 40000) && network === "PS.eu" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    BidGt(7.5, 22000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(5.5, 10000) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(4.4, 6500) && network === "PS.eu" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(3.3, 5000) && network === "PS.eu" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 6000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 7500) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isSuperTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 7500) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isSuperTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(88, isOffpeak ? 0 : 12000) &&
    network === "PS.eu" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 100000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(14, 20, 40000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 25000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 20000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 10000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 200000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(14, 20, 60000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 35000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 25000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 15000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 35000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 25000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 20000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 5000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 50000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 35000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 25000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 10000) &&
    network === "GG" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(20, 60000) && network === "PS.es" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(10, 20000) && network === "PS.es" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(5, 5000) && network === "PS.es" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(20, 80000) && network === "PS.es" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 25000) &&
    network === "Party" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(10, 25000) && network === "PS.es" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 37500) &&
    network === "Party" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(5, 7500) && network === "PS.es" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 25000) && network === "PS.es" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(5, 7500) && network === "PS.es" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(10, 40000) && network === "PS.es" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(5, 10000) && network === "PS.es" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 20000) &&
    network === "PS.es" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 30000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 15000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 25000) &&
    network === "GG" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 100000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(14, 20, 40000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 25000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 20000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 10000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 200000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 15000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(14, 20, 60000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 25000) &&
    network === "WPN" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 35000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 25000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 15000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 35000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 25000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 20000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 5000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 50000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 35000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 25000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 10000) &&
    network === "WPN" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(30, 100000) && network === "WNMX" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(20, 50000) && network === "WNMX" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(15, 20000) && network === "WNMX" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(30, 150000) && network === "WNMX" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 80000) && network === "WNMX" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 40000) && network === "WNMX" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 75000) && network === "WNMX" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(15, 30000) && network === "WNMX" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(20, 120000) && network === "WNMX" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 60000) && network === "WNMX" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 30000) && network === "WNMX" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(7.5, 15000) && network === "WNMX" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 15000) && network === "WNMX" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 7500) && network === "WNMX" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(33, 50000) && network === "WPN" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(33, 100000) && network === "WPN" && level === "3" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(27, 70000) && network === "WPN" && level === "3" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(27, 40000) && network === "WPN" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(22, 30000) && network === "WPN" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(22, 40000) && network === "WPN" && level === "3" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(16.5, 20000) && network === "WPN" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(16.5, 25000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(11, 10000) && network === "WPN" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(11, 12000) && network === "WPN" && level === "3" && effmu === "B" && isNormal && !isKo)
    return true;
  if (BidGt(33, 100000) && network === "PS.eu" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(27, 75000) && network === "PS.eu" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(22, 40000) && network === "PS.eu" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(16.5, 20000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(11, 15000) && network === "PS.eu" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 8000) && network === "PS.eu" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(5.5, 4000) && network === "PS.eu" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(33, 150000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 100000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(22, 60000) && network === "PS.eu" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(16.5, 40000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(11, 20000) && network === "PS.eu" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(7.5, 10000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(5.5, 5000) && network === "PS.eu" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 7000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 4000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 14000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 7500) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(27, 100000) && network === "PS.eu" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(22, 60000) && network === "PS.eu" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(16.5, 35000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(11, 20000) && network === "PS.eu" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 10000) && network === "PS.eu" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(215, 100000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, 150000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(5.5, 5000) && network === "PS.eu" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(4.4, 3000) && network === "PS.eu" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 45000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 130000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 16000) &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(22, 80000) && network === "PS.eu" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    BidGt(16.5, 50000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(11, 25000) && network === "PS.eu" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    BidGt(7.5, 15000) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(5.5, 7500) && network === "PS.eu" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(4.4, 5000) && network === "PS.eu" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 25000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 37500) &&
    network === "Party" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 75000) &&
    network === "Party" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(100, isOffpeak ? 0 : 20000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 5000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 30000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 15000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 25000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(100, 150, isOffpeak ? 0 : 15000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(100, 150, isOffpeak ? 0 : 30000) &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 15000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 25000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(100, 150, isOffpeak ? 0 : 15000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(100, 150, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(20, 40000) && network === "PS.es" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(10, 15000) && network === "PS.es" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(20, 60000) && network === "PS.es" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 20000) && network === "PS.es" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 50000) && network === "PS.es" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(10, 20000) && network === "PS.es" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(20, 80000) && network === "PS.es" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 25000) && network === "PS.es" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(21, 33, 75000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(14, 20, 20000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 14, 15000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 12500) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 8000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 100000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(14, 20, 40000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 30000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 20000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 10000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 100000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 200000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(14, 20, 60000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 35000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 25000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 15000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(14, 20, 40000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 25000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 20000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 10000) &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(30, 75000) && network === "WNMX" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(20, 30000) && network === "WNMX" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(15, 10000) && network === "WNMX" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(30, 150000) && network === "WNMX" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 50000) && network === "WNMX" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 25000) && network === "WNMX" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(30, 100000) && network === "WNMX" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(20, 50000) && network === "WNMX" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(15, 20000) && network === "WNMX" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(30, 150000) && network === "WNMX" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 80000) && network === "WNMX" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 40000) && network === "WNMX" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(21, 33, 60000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 15000) && network === "WPN" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 12000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 10000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 80000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(15, 30000) && network === "WPN" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 25000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 15000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 75000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 30000) && network === "WPN" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 20000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 15000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 50000) && network === "WPN" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 30000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 20000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 150000) &&
    network === "WPN" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 1000000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, 300000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(82, 215000) && network === "PS.eu" && level === "8" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 5000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, 1500000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 500000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, 330000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 300000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(82, 215000) && network === "PS.eu" && level === "8" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 5000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, 500000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, 375000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 200000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 120000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 70000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 100000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 150000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 30000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(20, 10000) && network === "PS.es" && level === "8" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(20, 20000) && network === "PS.es" && level === "8" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(200, 300, 1000000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 1500000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 750000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 400000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 150000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 200000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 750000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 400000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 150000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 250000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 200000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 100000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 120000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 150000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 45000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 16000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 75000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 75000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 150000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 45000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 16000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, 200000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 80000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 35000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 24000) &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 150000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 75000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 20000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 40000) &&
    network === "WNMX" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 50000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 75000) &&
    network === "Party" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 1000000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 1500000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 750000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 200000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 300000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 120000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 8000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 750000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 200000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 300000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 8000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 32000) &&
    network === "WPN" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 5000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 35000) &&
    network === "PS.es" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(100, 150, isOffpeak ? 0 : 15000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(100, 150, isOffpeak ? 0 : 30000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 150000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(52.5, 109, isOffpeak ? 0 : 25000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(52.5, 109, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 250000) &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 25000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(100, 150, isOffpeak ? 0 : 15000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(100, 150, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(52.5, 109, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 250000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(52.5, 109, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 600000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, 800000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 250000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, 325000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 160000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 130000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 80000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 45000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 1000000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, 1500000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 300000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, 500000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(82, 215000) && network === "PS.eu" && level === "9" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(82, 330000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 5000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 100000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 130000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 20000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 40000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 100000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 150000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 600000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 800000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 400000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 175000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 125000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 175000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 130000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 1000000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 1500000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 750000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 400000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 150000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 200000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 150000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 75000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 75000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 75000) &&
    network === "WNMX" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 600000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 800000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 400000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 140000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 200000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 65000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 1000000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 1500000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 750000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 200000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 300000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 120000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 8000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(44, 120000) && network === "PS.eu" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(33, 75000) && network === "PS.eu" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(27, 55000) && network === "PS.eu" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(22, 35000) && network === "PS.eu" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(16.5, 20000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(11, 15000) && network === "PS.eu" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 7000) && network === "PS.eu" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(44, 200000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, 100000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(27, 75000) && network === "PS.eu" && level === "4" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(22, 50000) && network === "PS.eu" && level === "4" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(16.5, 40000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(11, 20000) && network === "PS.eu" && level === "4" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(7.5, 10000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(33, 100000) && network === "PS.eu" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(27, 75000) && network === "PS.eu" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(22, 40000) && network === "PS.eu" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(16.5, 20000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(11, 15000) && network === "PS.eu" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 8000) && network === "PS.eu" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(5.5, 4000) && network === "PS.eu" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(33, 150000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 100000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(22, 60000) && network === "PS.eu" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    BidGt(16.5, 40000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(11, 20000) && network === "PS.eu" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    BidGt(7.5, 10000) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(5.5, 5000) && network === "PS.eu" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(55, 66, 150000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (BidGt(44, 80000) && network === "Party" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(33, 15000) && network === "Party" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(27, 12500) && network === "Party" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (BidGt(22, 8000) && network === "Party" && level === "4" && effmu === "A" && isNormal && isKo)
    return true;
  if (
    FromToGt(55, 66, 300000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(44, 150000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(33, 40000) &&
    network === "Party" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(20, 30000) && network === "PS.es" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(10, 15000) && network === "PS.es" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(20, 50000) && network === "PS.es" && level === "4" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 20000) && network === "PS.es" && level === "4" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 40000) && network === "PS.es" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(10, 15000) && network === "PS.es" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(20, 60000) && network === "PS.es" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 20000) && network === "PS.es" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 50000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(14, 20, 20000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 15000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 12500) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.26, 8.25, 7000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 200000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 75000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(14, 20, 40000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 25000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 20000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.26, 8.25, 10000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 75000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(14, 20, 20000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 15000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 12500) &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 8000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 100000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(14, 20, 40000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 30000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 20000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 10000) &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(40, 125000) && network === "WNMX" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(30, 75000) && network === "WNMX" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(40, 200000) && network === "WNMX" && level === "4" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(30, 125000) && network === "WNMX" && level === "4" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(30, 75000) && network === "WNMX" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(20, 30000) && network === "WNMX" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(15, 10000) && network === "WNMX" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(30, 120000) && network === "WNMX" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 50000) && network === "WNMX" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 25000) && network === "WNMX" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(34, 49, 100000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 40000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 15000) && network === "WPN" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 12000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 10000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 150000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 60000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(15, 30000) && network === "WPN" && level === "4" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 20000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 15000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 60000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 15000) && network === "WPN" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 12000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 10000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 80000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(15, 30000) && network === "WPN" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 25000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 15000) &&
    network === "WPN" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(55, 200000) && network === "PS.eu" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(33, 75000) && network === "PS.eu" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(27, 55000) && network === "PS.eu" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(22, 35000) && network === "PS.eu" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(16.5, 15000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(11, 5000) && network === "PS.eu" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(55, 400000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, 150000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(33, 90000) && network === "PS.eu" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(27, 62000) && network === "PS.eu" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(22, 50000) && network === "PS.eu" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(16.5, 25000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(11, 10000) && network === "PS.eu" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(44, 120000) && network === "PS.eu" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(44, 120000) && network === "PS.eu" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(33, 75000) && network === "PS.eu" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(27, 55000) && network === "PS.eu" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(22, 35000) && network === "PS.eu" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(16.5, 20000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(11, 15000) && network === "PS.eu" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 7000) && network === "PS.eu" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(44, 200000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, 100000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(27, 75000) && network === "PS.eu" && level === "5" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(22, 50000) && network === "PS.eu" && level === "5" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    BidGt(16.5, 40000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(11, 20000) && network === "PS.eu" && level === "5" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    BidGt(7.5, 10000) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(30, 75000) && network === "PS.es" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(20, 30000) && network === "PS.es" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(30, 90000) && network === "PS.es" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 50000) && network === "PS.es" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 30000) && network === "PS.es" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(10, 15000) && network === "PS.es" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(20, 50000) && network === "PS.es" && level === "5" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 20000) && network === "PS.es" && level === "5" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(50, 66, 200000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 50000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 15000) && network === "GG" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 5000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 400000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 150000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 62000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(15, 25000) && network === "GG" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 10000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 50000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 20000) && network === "GG" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 15000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 12500) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.26, 8.25, 7000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 200000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 75000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(15, 40000) && network === "GG" && level === "5" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 25000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 20000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.26, 8.25, 10000) &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(50, 150000) && network === "WNMX" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(40, 100000) && network === "WNMX" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(30, 50000) && network === "WNMX" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(50, 250000) && network === "WNMX" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(40, 150000) && network === "WNMX" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(30, 100000) && network === "WNMX" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 125000) &&
    network === "WNMX" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(30, 75000) && network === "WNMX" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 200000) &&
    network === "WNMX" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(30, 125000) && network === "WNMX" && level === "5" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(50, 66, 150000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 100000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 40000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 300000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 50000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(15, 12000) && network === "WPN" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 4000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 20000) && network === "WPN" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 8000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 100000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 40000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 15000) && network === "WPN" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 12000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 10000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 150000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 60000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(15, 30000) && network === "WPN" && level === "5" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 20000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 15000) &&
    network === "WPN" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 400000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, 600000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 225000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 160000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 75000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 32000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 18000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 600000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, 800000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 250000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, 325000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 160000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 130000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 80000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 45000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 75000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 15000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 30000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 100000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 130000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 20000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 40000) &&
    network === "PS.es" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 400000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 600000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 200000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 125000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 200000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 120000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 32000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 600000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 800000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 400000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 175000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 125000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 175000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 130000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(70, 75000) && network === "WNMX" && level === "10" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 150000) &&
    network === "WNMX" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(55, 150000) && network === "PS.eu" && level === "6" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    FromToGt(200, 300, 400000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 90000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 600000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, 250000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 90000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 200000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 60000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 25000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(55, 200000) && network === "PS.eu" && level === "6" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 120000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 75000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 55000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 35000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(16.5, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(11, isOffpeak ? 0 : 5000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, 400000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 90000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 62000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(11, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 600000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 800000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 400000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 140000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 200000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 65000) &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 150000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 45000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 16000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, 200000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 80000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 35000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 24000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 200000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 150000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 90000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 15000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, 250000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 300000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 75000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 24000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 250000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 60000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 400000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 109000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 200000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 15000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, isOffpeak ? 0 : 5000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 400000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 62000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 25000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 90000) &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, 250000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 75000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 24000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, 400000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 109000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 15000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(215, 400000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 32000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 18000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(215, 600000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, isOffpeak ? 0 : 225000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, isOffpeak ? 0 : 160000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 75000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 35000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 35000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 35000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 25000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 15000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 75000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 30000) &&
    network === "PS.es" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 150000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(52.5, 109, isOffpeak ? 0 : 25000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 250000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 80000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(52.5, 109, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 250000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 125000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 24000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 400000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 200000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 125000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 90000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 60000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 250000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 125000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 24000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 400000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 200000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 125000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 90000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 60000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 400000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 200000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 125000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 32000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 600000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 200000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, isOffpeak ? 0 : 120000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 75000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 25000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 75000) &&
    network === "WNMX" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 75000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 75000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 250000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 125000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 60000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 400000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 200000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 400000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 200000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 25000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 600000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 60000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 150000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(52.5, 109, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 250000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(52.5, 109, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 250000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 125000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 60000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 400000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 200000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 125000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 90000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 40000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 200000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 125000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 80000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 150000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 50000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 250000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 150000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 100000) &&
    network === "WNMX" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 120000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 70000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 12000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 200000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 120000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 15000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 150000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 12000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, isOffpeak ? 0 : 4000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 300000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 120000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 20000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, isOffpeak ? 0 : 8000) &&
    network === "WPN" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(109, 300000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(82, 215000) && network === "PS.eu" && level === "7" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 100000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 10000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 5000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(109, 500000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(82, 375000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(55, isOffpeak ? 0 : 200000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 120000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 70000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(55, 150000) && network === "PS.eu" && level === "7" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 90000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 50000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 30000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(16.5, isOffpeak ? 0 : 20000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(55, 250000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(44, isOffpeak ? 0 : 150000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(33, isOffpeak ? 0 : 90000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(27, isOffpeak ? 0 : 60000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(22, isOffpeak ? 0 : 40000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, isOffpeak ? 0 : 25000) &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 30000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(20, isOffpeak ? 0 : 10000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(20, isOffpeak ? 0 : 20000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 50000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(20, isOffpeak ? 0 : 20000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 90000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(20, isOffpeak ? 0 : 30000) &&
    network === "PS.es" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 250000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 150000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 50000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 10000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 750000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 400000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 250000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 200000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 120000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(67, 79, 200000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 150000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 90000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 40000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 15000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(67, 79, 300000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 250000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 150000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 60000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 20000) &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 125000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 90000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 40000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 200000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 125000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 80000) &&
    network === "WNMX" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 200000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 8000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 750000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 300000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 150000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 100000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 32000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 120000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 70000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 30000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 12000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 200000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 120000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 50000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 15000) &&
    network === "WPN" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(20, 75000) && network === "IP" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(15, 30000) && network === "IP" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(10, 15000) && network === "IP" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 7500) && network === "IP" && level === "1" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(20, 120000) && network === "IP" && level === "1" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 60000) && network === "IP" && level === "1" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 30000) && network === "IP" && level === "1" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(7.5, 15000) && network === "IP" && level === "1" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 50000) && network === "IP" && level === "1" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(10, 30000) && network === "IP" && level === "1" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 15000) && network === "IP" && level === "1" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(15, 75000) && network === "IP" && level === "1" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 50000) && network === "IP" && level === "1" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(7.5, 25000) && network === "IP" && level === "1" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 35000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 25000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 20000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 5000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 50000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 35000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 25000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 10000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 40000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 25000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 9000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 75000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 40000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 13000) &&
    network === "Chico" &&
    level === "1" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 100000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(14, 20, 40000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 25000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 20000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 10000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 200000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 15000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(14, 20, 60000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 25000) &&
    network === "Chico" &&
    level === "15" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 35000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 25000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 15000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 35000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 25000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 20000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 5000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, 50000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 35000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(5.25, 8.25, 25000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(2.5, 5, 10000) &&
    network === "Chico" &&
    level === "2" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(30, 100000) && network === "IP" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(20, 50000) && network === "IP" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(15, 20000) && network === "IP" && level === "2" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(30, 150000) && network === "IP" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 80000) && network === "IP" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 40000) && network === "IP" && level === "2" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 75000) && network === "IP" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(15, 30000) && network === "IP" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(20, 120000) && network === "IP" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 60000) && network === "IP" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 30000) && network === "IP" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(7.5, 15000) && network === "IP" && level === "2" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(10, 15000) && network === "IP" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(7.5, 7500) && network === "IP" && level === "2" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(33, 50000) && network === "Chico" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(33, 100000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(27, 70000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(27, 40000) && network === "Chico" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (BidGt(22, 30000) && network === "Chico" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(22, 40000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGt(16.5, 20000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGt(16.5, 25000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (BidGt(11, 10000) && network === "Chico" && level === "3" && effmu === "B" && isNormal && isKo)
    return true;
  if (
    BidGt(11, 12000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 15000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 25000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(100, 150, isOffpeak ? 0 : 15000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(100, 150, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "14" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(30, 75000) && network === "IP" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(20, 30000) && network === "IP" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(15, 10000) && network === "IP" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(30, 150000) && network === "IP" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 50000) && network === "IP" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 25000) && network === "IP" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(30, 100000) && network === "IP" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(20, 50000) && network === "IP" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(15, 20000) && network === "IP" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(30, 150000) && network === "IP" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 80000) && network === "IP" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 40000) && network === "IP" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(21, 33, 60000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 15000) && network === "Chico" && level === "3" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 12000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 10000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 80000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(15, 30000) && network === "Chico" && level === "3" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 25000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 15000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 75000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 30000) && network === "Chico" && level === "3" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 20000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 15000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 50000) && network === "Chico" && level === "3" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 30000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 20000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 150000) &&
    network === "Chico" &&
    level === "3" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 75000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 75000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 150000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 75000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 20000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 40000) &&
    network === "IP" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 1000000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 1500000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 750000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 200000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 300000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 120000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 8000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 750000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 200000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 300000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 8000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 32000) &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 25000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(100, 150, isOffpeak ? 0 : 15000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(100, 150, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(52.5, 109, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, isOffpeak ? 0 : 250000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(52.5, 109, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "13" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 150000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 75000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 75000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 75000) &&
    network === "IP" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 600000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 800000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 400000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 140000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 200000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 65000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 1000000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 1500000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 750000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 200000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 300000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 120000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 8000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(40, 125000) && network === "IP" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(30, 75000) && network === "IP" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(40, 200000) && network === "IP" && level === "4" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(30, 125000) && network === "IP" && level === "4" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(30, 75000) && network === "IP" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(20, 30000) && network === "IP" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(15, 10000) && network === "IP" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (BidGt(30, 120000) && network === "IP" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(20, 50000) && network === "IP" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (BidGt(15, 25000) && network === "IP" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(34, 49, 100000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 40000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 15000) && network === "Chico" && level === "4" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 12000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 10000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 150000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 60000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(15, 30000) && network === "Chico" && level === "4" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 20000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 15000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 60000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 15000) && network === "Chico" && level === "4" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 12000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 10000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 80000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(15, 30000) && network === "Chico" && level === "4" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 25000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 15000) &&
    network === "Chico" &&
    level === "4" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(50, 150000) && network === "IP" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(40, 100000) && network === "IP" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(30, 50000) && network === "IP" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (BidGt(50, 250000) && network === "IP" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(40, 150000) && network === "IP" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (BidGt(30, 100000) && network === "IP" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 125000) &&
    network === "IP" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(30, 75000) && network === "IP" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 200000) &&
    network === "IP" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(30, 125000) && network === "IP" && level === "5" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(50, 66, 150000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 100000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 40000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 300000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 120000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 50000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(15, 12000) && network === "Chico" && level === "5" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 4000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 20000) && network === "Chico" && level === "5" && effmu === "A" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 8000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, 100000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, 40000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (BidGt(15, 15000) && network === "Chico" && level === "5" && effmu === "B" && isTurbo && isKo)
    return true;
  if (
    FromToGt(10.75, 13, 12000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 10000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, 150000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, 60000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(15, 30000) && network === "Chico" && level === "5" && effmu === "B" && isTurbo && !isKo)
    return true;
  if (
    FromToGt(10.75, 13, 20000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(8.4, 10.5, 15000) &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (BidGt(70, 75000) && network === "IP" && level === "10" && effmu === "A" && isTurbo && isKo)
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 150000) &&
    network === "IP" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 400000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 600000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 200000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 60000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 25000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 600000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 800000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 400000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 140000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 200000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 65000) &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 25000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 75000) &&
    network === "IP" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 75000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 75000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(70, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 250000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 125000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 60000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 400000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 200000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 400000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 200000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 25000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 600000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 300000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 60000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 150000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(52.5, 109, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 250000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(52.5, 109, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(200, 300, 250000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 125000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 60000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(200, 300, 400000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 200000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 125000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 90000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 40000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 200000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 125000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 80000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 150000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 50000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 250000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 150000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 100000) &&
    network === "IP" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 120000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 70000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 12000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 200000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 120000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 15000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 150000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 12000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, isOffpeak ? 0 : 4000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 300000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 120000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 20000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(10.75, 13, isOffpeak ? 0 : 8000) &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 125000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 90000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 40000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(50, isOffpeak ? 0 : 200000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(40, isOffpeak ? 0 : 125000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(30, isOffpeak ? 0 : 80000) &&
    network === "IP" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(121, 150, 500000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(80, 120, 200000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 80000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 40000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 8000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(121, 150, 750000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(80, 120, 300000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, isOffpeak ? 0 : 150000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 100000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 32000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(50, 66, 120000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 70000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 30000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 12000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    isKo
  )
    return true;
  if (
    FromToGt(50, 66, 200000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(34, 49, isOffpeak ? 0 : 120000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    FromToGt(21, 33, isOffpeak ? 0 : 50000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGt(15, isOffpeak ? 0 : 15000) &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo &&
    !isKo
  )
    return true;
  if (
    BidGtName(11, 10000, "Battle Royale") &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(11, 10000, "Battle Royale") &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(11, 10000, "Saturday KO") &&
    network === "PS.eu" &&
    level === "1" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(11, 10000, "Battle Royale") &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(11, 10000, "Saturday KO") &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    Name("big") &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    !isKo &&
    FromTo(1, 5.5) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    Name("Bounty Builder") &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    isKo &&
    FromTo(1, 5.5) &&
    network === "PS.eu" &&
    level === "0" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(25, 25000, "GGMasters") &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(25, 50000, "GGMasters") &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(33, 20000, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (FromToName(1, 11, "hot") && network === "PS.eu" && level === "3" && effmu === "A" && isTurbo)
    return true;
  if (
    BidGtName(25, 15000, "GGMasters") &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(25, 25000, "GGMasters") &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(25, 30000, "GGMasters") &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(25, 35000, "GGMasters") &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(52.5, 125000, "Bounty Hunters") &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo &&
    StartDay("Sunday") &&
    network === "GG" &&
    level === "3" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(52.5, 150000, "Bounty Hunters") &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo &&
    StartDay("Sunday") &&
    network === "GG" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(52.5, 150000, "Bounty Hunters") &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo &&
    StartDay("Sunday") &&
    network === "GG" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(33, 10000, "Speedway") &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    BidGtName(33, 10000, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidName(22, "Mini Thursday Thrill") &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromToName(1, 16.5, "hot") &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (FromToName(1, 11, "hot") && network === "PS.eu" && level === "4" && effmu === "B" && isTurbo)
    return true;
  if (
    BidGtName(33, 20000, " Bounty Builder") &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(33, 10000, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidName(22, "Mini Thursday Thrill") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(33, 10000, "Speedway") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo
  )
    return true;
  if (
    FromToName(1, 16.5, "hot") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isTurbo
  )
    return true;
  if (FromToName(1, 22, "hot") && network === "PS.eu" && level === "5" && effmu === "A" && isTurbo)
    return true;
  if (
    BidGtName(33, 10000, "Speedway") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (BidName(27, "big") && network === "PS.eu" && level === "5" && effmu === "A" && isNormal)
    return true;
  if (BidGt(8.88, 10000) && network === "PS.eu" && level === "5" && effmu === "A" && isSuperTurbo)
    return true;
  if (BidName(27, "big") && network === "PS.eu" && level === "6" && effmu === "B" && isNormal)
    return true;
  if (FromToName(1, 22, "hot") && network === "PS.eu" && level === "6" && effmu === "B" && isTurbo)
    return true;
  if (
    BidGtName(33, 10000, "Speedway") &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isTurbo
  )
    return true;
  if (BidGt(8.88, 10000) && network === "PS.eu" && level === "6" && effmu === "B" && isSuperTurbo)
    return true;
  if (
    BidGtName(33, 10000, "Speedway") &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (FromToName(1, 27, "hot") && network === "PS.eu" && level === "6" && effmu === "A" && isTurbo)
    return true;
  if (BidGt(8.88, 8000) && network === "PS.eu" && level === "6" && effmu === "A" && isSuperTurbo)
    return true;
  if (BidGt(8.88, 5000) && network === "PS.eu" && level === "7" && effmu === "A" && isSuperTurbo)
    return true;
  if (
    BidGtName(33, 10000, "Speedway") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (BidName(55, "Marathon") && network === "PS.eu" && level === "7" && effmu === "A" && isNormal)
    return true;
  if (
    BidName(82, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    StartDay("Sunday") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 12000, "Saturday KO") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(33, 10000, "Speedway") &&
    network === "PS.eu" &&
    level === "7" &&
    effmu === "B" &&
    isTurbo
  )
    return true;
  if (FromToName(1, 27, "hot") && network === "PS.eu" && level === "7" && effmu === "B" && isTurbo)
    return true;
  if (BidGt(8.88, 8000) && network === "PS.eu" && level === "7" && effmu === "B" && isSuperTurbo)
    return true;
  if (BidName(55, "Marathon") && network === "PS.eu" && level === "8" && effmu === "B" && isNormal)
    return true;
  if (
    BidName(82, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    StartDay("Sunday") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 12000, "Saturday KO") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(33, 10000, "Speedway") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "B" &&
    isTurbo
  )
    return true;
  if (BidGt(8.88, 5000) && network === "PS.eu" && level === "8" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromToName(1, 27, "hot") && network === "PS.eu" && level === "8" && effmu === "A" && isTurbo)
    return true;
  if (BidGt(8.88, 0) && network === "PS.eu" && level === "8" && effmu === "A" && isSuperTurbo)
    return true;
  if (BidName(55, "Marathon") && network === "PS.eu" && level === "8" && effmu === "A" && isNormal)
    return true;
  if (
    BidName(82, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 12000, "Saturday KO") &&
    network === "PS.eu" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 12000, "Saturday KO") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidName(82, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (BidName(55, "Marathon") && network === "PS.eu" && level === "9" && effmu === "A" && isNormal)
    return true;
  if (FromToName(1, 27, "hot") && network === "PS.eu" && level === "9" && effmu === "A" && isTurbo)
    return true;
  if (BidGt(8.88, 0) && network === "PS.eu" && level === "9" && effmu === "A" && isSuperTurbo)
    return true;
  if (
    BidName(82, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (BidName(55, "Marathon") && network === "PS.eu" && level === "9" && effmu === "B" && isNormal)
    return true;
  if (
    BidGtName(109, 12000, "Saturday KO") &&
    network === "PS.eu" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (FromToName(1, 27, "hot") && network === "PS.eu" && level === "9" && effmu === "B" && isTurbo)
    return true;
  if (BidGt(8.88, 0) && network === "PS.eu" && level === "9" && effmu === "B" && isSuperTurbo)
    return true;
  if (BidGtName(109, 12000, "Saturday KO") && network === "PS.eu" && level === "10" && isNormal)
    return true;
  if (BidName(82, "Bounty Builder") && network === "PS.eu" && level === "10" && isNormal)
    return true;
  if (BidName(55, "Marathon") && network === "PS.eu" && level === "10" && isNormal) return true;
  if (FromToName(1, 33, "hot") && network === "PS.eu" && level === "10" && effmu === "A" && isTurbo)
    return true;
  if (FromToName(1, 27, "hot") && network === "PS.eu" && level === "10" && effmu === "B" && isTurbo)
    return true;
  if (BidGt(8.88, 0) && network === "PS.eu" && level === "10" && isSuperTurbo) return true;
  if (
    BidName(22, "Supersonic") &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isSuperTurbo
  )
    return true;
  if (BidName(82, "Bigger") && network === "PS.eu" && level === "10" && effmu === "A" && isNormal)
    return true;
  if (
    BidGtName(109, 10000, "Sunday Wrap-Up") &&
    network === "PS.eu" &&
    level === "10" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (BidGtName(109, 10000, "Sunday Wrap-Up") && network === "PS.eu" && level === "11" && isNormal)
    return true;
  if (BidGtName(109, 12000, "Saturday KO") && network === "PS.eu" && level === "11" && isNormal)
    return true;
  if (BidName(82, "Bounty Builder") && network === "PS.eu" && level === "11" && isNormal)
    return true;
  if (BidName(82, "Bigger") && network === "PS.eu" && level === "11" && effmu === "B" && isNormal)
    return true;
  if (BidName(82, "big") && network === "PS.eu" && level === "11" && effmu === "A" && isNormal)
    return true;
  if (BidName(55, "Marathon") && network === "PS.eu" && level === "11" && effmu === "B" && isNormal)
    return true;
  if (FromToName(1, 44, "hot") && network === "PS.eu" && level === "11" && effmu === "A" && isTurbo)
    return true;
  if (FromToName(1, 33, "hot") && network === "PS.eu" && level === "11" && effmu === "B" && isTurbo)
    return true;
  if (BidGt(8.88, 0) && network === "PS.eu" && level === "11" && isSuperTurbo) return true;
  if (BidName(22, "Supersonic") && network === "PS.eu" && level === "11" && isSuperTurbo)
    return true;
  if (
    BidGtName(109, 30000, "Kickoff") &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    StartDay("Sunday") &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidName(162, "Daily Pacific Rim Special") &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidName(215, "Thursday Thrill") &&
    network === "PS.eu" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (BidName(22, "Supersonic") && network === "PS.eu" && level === "12" && isSuperTurbo)
    return true;
  if (BidGt(8.88, 0) && network === "PS.eu" && level === "12" && isSuperTurbo) return true;
  if (FromToName(1, 44, "hot") && network === "PS.eu" && level === "12" && isTurbo) return true;
  if (BidName(82, "Bounty Builder") && network === "PS.eu" && level === "12" && isNormal)
    return true;
  if (BidName(82, "big") && network === "PS.eu" && level === "12" && isNormal) return true;
  if (BidGtName(109, 10000, "Sunday Wrap-Up") && network === "PS.eu" && level === "12" && isNormal)
    return true;
  if (
    BidGtName(109, 12000, "Saturday KO") &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 30000, "Kickoff") &&
    network === "PS.eu" &&
    level === "12" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (BidName(215, "Thursday Thrill") && network === "PS.eu" && level === "12" && isNormal)
    return true;
  if (
    BidName(162, "Daily Pacific Rim Special") &&
    network === "PS.eu" &&
    level === "12" &&
    isNormal
  )
    return true;
  if (BidName(215, "Thursday Thrill") && network === "PS.eu" && level === "13" && isNormal)
    return true;
  if (
    BidName(162, "Daily Pacific Rim Special") &&
    network === "PS.eu" &&
    level === "13" &&
    isNormal
  )
    return true;
  if (BidName(22, "Supersonic") && network === "PS.eu" && level === "13" && isSuperTurbo)
    return true;
  if (BidGt(8.88, 0) && network === "PS.eu" && level === "13" && isSuperTurbo) return true;
  if (FromToName(1, 82, "hot") && network === "PS.eu" && level === "13" && effmu === "A" && isTurbo)
    return true;
  if (FromToName(1, 44, "hot") && network === "PS.eu" && level === "13" && effmu === "B" && isTurbo)
    return true;
  if (BidName(82, "big") && network === "PS.eu" && level === "13" && effmu === "B" && isNormal)
    return true;
  if (
    BidName(82, "Bounty Builder") &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 10000, "Sunday Wrap-Up") &&
    network === "PS.eu" &&
    level === "13" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    FromToName(1, 162, "hot") &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "A" &&
    isTurbo
  )
    return true;
  if (
    BidName(215, "Thursday Thrill") &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidName(162, "Daily Pacific Rim Special") &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (FromToName(1, 82, "hot") && network === "PS.eu" && level === "14" && effmu === "B" && isTurbo)
    return true;
  if (BidGt(8.88, 0) && network === "PS.eu" && level === "14" && effmu === "B" && isSuperTurbo)
    return true;
  if (
    BidName(22, "Supersonic") &&
    network === "PS.eu" &&
    level === "14" &&
    effmu === "B" &&
    isSuperTurbo
  )
    return true;
  if (FromToName(1, 215, "hot") && network === "PS.eu" && level === "15" && isTurbo) return true;
  if (BidName(215, "Sunday Supersonic") && network === "PS.eu" && level === "15" && isSuperTurbo)
    return true;
  if (
    BidGtName(25, 5000, "GGMasters") &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(25, 20000, "GGMasters") &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(52.5, 75000, "Bounty Hunters") &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo &&
    StartDay("Sunday") &&
    network === "GG" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(52.5, 125000, "Bounty Hunters") &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo &&
    StartDay("Sunday") &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(25, 15000, "GGMasters") &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(25, 30000, "GGMasters") &&
    network === "GG" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(25, 5000, "GGMasters") &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(25, 20000, "GGMasters") &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(52.5, 75000, "Bounty Hunters") &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo &&
    StartDay("Sunday") &&
    network === "GG" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(52.5, 50000, "Bounty Hunters") &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo &&
    StartDay("Sunday") &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidName(25, "GGMasters") &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(25, 10000, "GGMasters") &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(150, 400000, "GGMasters") &&
    network === "GG" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(52.5, 50000, "Bounty Hunters") &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo &&
    StartDay("Sunday") &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(25, 10000, "GGMasters") &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(150, 400000, "GGMasters") &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidName(25, "GGMasters") &&
    network === "GG" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(150, 250000, "GGMasters") &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(105, 100000, "GGMasters Bonus Bounty") &&
    network === "GG" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(150, 175000, "GGMasters") &&
    network === "GG" &&
    level === "7" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(150, 250000, "GGMasters") &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(105, 100000, "GGMasters Bonus Bounty") &&
    network === "GG" &&
    level === "7" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(150, 150000, "GGMasters") &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(315, 500000, "GGMasters") &&
    network === "GG" &&
    level === "8" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(150, 175000, "GGMasters") &&
    network === "GG" &&
    level === "8" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(315, 500000, "GGMasters") &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(150, 150000, "GGMasters") &&
    network === "GG" &&
    level === "9" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(150, 150000, "GGMasters") &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(150, 100000, "Saturday Knockout") &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(84, 15000, "Bounty Hunters Specia") &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(55, 15000, "Fifty Stack") &&
    network === "GG" &&
    level === "9" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(150, 100000, "Saturday Knockout") &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(84, 15000, "Bounty Hunters Specia") &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(150, 150000, "GGMasters") &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(55, 15000, "Fifty Stack") &&
    network === "GG" &&
    level === "10" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(150, 100000, "Saturday Knockout") &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(84, 15000, "Bounty Hunters Specia") &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(55, 15000, "Fifty Stack") &&
    network === "GG" &&
    level === "10" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(150, 100000, "Saturday Knockout") &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(84, 15000, "Bounty Hunters Specia") &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(55, 15000, "Fifty Stack") &&
    network === "GG" &&
    level === "11" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(525, 1000000, "Bounty Hunters HR") &&
    network === "GG" &&
    level === "11" &&
    effmu === "A" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(525, 1000000, "Bounty Hunters H") &&
    network === "GG" &&
    level === "12" &&
    effmu === "B" &&
    isNormal &&
    isKo
  )
    return true;
  if (
    BidGtName(1050, 1000000, "GGMasters High Rollers") &&
    network === "GG" &&
    level === "12" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(1050, 750000, "GGMasters High Rollers") &&
    network === "GG" &&
    level === "13" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidName(250, "Daily Main Event") &&
    network === "GG" &&
    level === "13" &&
    effmu === "A" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidName(250, "Daily Main Event") &&
    network === "GG" &&
    level === "14" &&
    effmu === "B" &&
    isNormal &&
    !isKo
  )
    return true;
  if (
    BidGtName(109, 250000, "Main Event") &&
    network === "Chico" &&
    level === "4" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 250000, "Main Event") &&
    network === "Chico" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 200000, "Main Event") &&
    network === "Chico" &&
    level === "5" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 200000, "Main Event") &&
    network === "Chico" &&
    level === "6" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 75000, "Main Event") &&
    network === "Chico" &&
    level === "6" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 75000, "Main Event") &&
    network === "Chico" &&
    level === "7" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 50000, "Main Event") &&
    network === "Chico" &&
    level === "7" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 50000, "Main Event") &&
    network === "Chico" &&
    level === "8" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 50000, "Main Event") &&
    network === "Chico" &&
    level === "8" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 50000, "Main Event") &&
    network === "Chico" &&
    level === "9" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 30000, "Main Event") &&
    network === "Chico" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 30000, "Main Event") &&
    network === "Chico" &&
    level === "10" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 20000, "Main Event") &&
    network === "Chico" &&
    level === "10" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 20000, "Main Event") &&
    network === "Chico" &&
    level === "11" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 20000, "Main Event") &&
    network === "Chico" &&
    level === "11" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(109, 20000, "Main Event") &&
    network === "Chico" &&
    level === "12" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(66, 25000, "BIG10") &&
    network === "WPN" &&
    level === "9" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(66, 25000, "BIG10") &&
    network === "WPN" &&
    level === "10" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    BidGtName(66, 25000, "BIG10") &&
    network === "WPN" &&
    level === "10" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (
    BidGtName(66, 25000, "BIG10") &&
    network === "WPN" &&
    level === "11" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (FromTo(1, 3.3) && network === "PS.eu" && level === "0" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 3.3) && network === "GG" && level === "0" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 4.4) && network === "GG" && level === "0" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 5.5) && network === "PS.eu" && level === "1" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 2.2) && network === "PS.eu" && level === "1" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 12) && network === "888" && level === "1" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 3.3) && network === "888" && level === "1" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 5.5) && network === "GG" && level === "1" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 2.2) && network === "GG" && level === "1" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "IP" && level === "1" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 5) && network === "IP" && level === "1" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 5) && network === "WNMX" && level === "1" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "1" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "Chico" && level === "1" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 2.2) && network === "Chico" && level === "1" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 2.2) && network === "WPN" && level === "1" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 5.5) && network === "WPN" && level === "1" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "PS.eu" && level === "1" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 2.2) && network === "PS.eu" && level === "1" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 12) && network === "888" && level === "1" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 3.3) && network === "888" && level === "1" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 4.4) && network === "GG" && level === "1" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "1" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5) && network === "WNMX" && level === "1" && effmu === "B" && isTurbo) return true;
  if (FromTo(0, 5) && network === "IP" && level === "1" && effmu === "B" && isTurbo) return true;
  if (FromTo(0, 10) && network === "IP" && level === "1" && effmu === "B" && isNormal) return true;
  if (FromTo(0, 5.5) && network === "WPN" && level === "1" && effmu === "B" && isNormal)
    return true;
  if (FromTo(0, 2.2) && network === "WPN" && level === "1" && effmu === "B" && isTurbo) return true;
  if (FromTo(0, 2.2) && network === "Chico" && level === "1" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(0, 5.5) && network === "Chico" && level === "1" && effmu === "B" && isNormal)
    return true;
  if (FromTo(0, 7.5) && network === "PS.eu" && level === "2" && effmu === "A" && isNormal)
    return true;
  if (FromTo(0, 3.3) && network === "PS.eu" && level === "2" && effmu === "A" && isTurbo)
    return true;
  if (
    FromTo(0, 16.5) &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("deepstack") &&
    network === "PS.eu" &&
    level === "2" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (FromTo(0, 5.5) && network === "PS.eu" && level === "2" && effmu === "B" && isNormal)
    return true;
  if (FromTo(0, 2.2) && network === "PS.eu" && level === "2" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(0, 12) && network === "888" && level === "2" && effmu === "A" && isNormal) return true;
  if (FromTo(0, 3.3) && network === "888" && level === "2" && effmu === "A" && isTurbo) return true;
  if (FromTo(0, 12) && network === "888" && level === "2" && effmu === "B" && isNormal) return true;
  if (FromTo(0, 3.3) && network === "888" && level === "2" && effmu === "B" && isTurbo) return true;
  if (FromTo(0, 11) && network === "GG" && level === "2" && effmu === "A" && isNormal) return true;
  if (FromTo(0, 5.25) && network === "GG" && level === "2" && effmu === "A" && isTurbo) return true;
  if (FromTo(0, 5.5) && network === "GG" && level === "2" && effmu === "B" && isNormal) return true;
  if (FromTo(0, 2.2) && network === "GG" && level === "2" && effmu === "B" && isTurbo) return true;
  if (FromTo(0, 5) && network === "PS.es" && level === "2" && effmu === "A" && isNormal)
    return true;
  if (FromTo(0, 2) && network === "PS.es" && level === "2" && effmu === "A" && isTurbo) return true;
  if (FromTo(0, 5) && network === "PS.es" && level === "2" && effmu === "B" && isNormal)
    return true;
  if (FromTo(0, 2) && network === "PS.es" && level === "2" && effmu === "B" && isTurbo) return true;
  if (FromTo(0, 20) && network === "WNMX" && level === "2" && effmu === "A" && isNormal)
    return true;
  if (FromTo(0, 10) && network === "WNMX" && level === "2" && effmu === "A" && isTurbo) return true;
  if (FromTo(0, 5) && network === "WNMX" && level === "2" && effmu === "B" && isTurbo) return true;
  if (FromTo(0, 10) && network === "WNMX" && level === "2" && effmu === "B" && isNormal)
    return true;
  if (FromTo(0, 10) && network === "IP" && level === "2" && effmu === "B" && isNormal) return true;
  if (FromTo(0, 5) && network === "IP" && level === "2" && effmu === "B" && isTurbo) return true;
  if (FromTo(0, 10) && network === "IP" && level === "2" && effmu === "A" && isTurbo) return true;
  if (FromTo(0, 20) && network === "IP" && level === "2" && effmu === "A" && isNormal) return true;
  if (FromTo(0, 11) && network === "WPN" && level === "2" && effmu === "A" && isNormal) return true;
  if (FromTo(0, 5.25) && network === "WPN" && level === "2" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(0, 11) && network === "Chico" && level === "2" && effmu === "A" && isNormal)
    return true;
  if (FromTo(0, 5.25) && network === "Chico" && level === "2" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(0, 5.5) && network === "Chico" && level === "2" && effmu === "B" && isNormal)
    return true;
  if (FromTo(0, 2.2) && network === "Chico" && level === "2" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(0, 2.2) && network === "WPN" && level === "2" && effmu === "B" && isTurbo) return true;
  if (FromTo(0, 5.5) && network === "WPN" && level === "2" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 11) && network === "PS.eu" && level === "3" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 4.4) && network === "PS.eu" && level === "3" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 7.5) && network === "PS.eu" && level === "3" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 3.3) && network === "PS.eu" && level === "3" && effmu === "B" && isTurbo)
    return true;
  if (
    FromTo(1, 16.5) &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("deepstack") &&
    network === "PS.eu" &&
    level === "3" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (FromTo(1, 11) && network === "Party" && level === "3" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "Party" && level === "3" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 7.5) && network === "Party" && level === "3" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 3.3) && network === "Party" && level === "3" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 16.5) && network === "888" && level === "3" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "888" && level === "3" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 12) && network === "888" && level === "3" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 3.3) && network === "888" && level === "3" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 10) && network === "PS.es" && level === "3" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5) && network === "PS.es" && level === "3" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "PS.es" && level === "3" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5) && network === "PS.es" && level === "3" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 15) && network === "GG" && level === "3" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 5.25) && network === "GG" && level === "3" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 11) && network === "GG" && level === "3" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 5.25) && network === "GG" && level === "3" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 20) && network === "IP" && level === "3" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 10) && network === "IP" && level === "3" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 20) && network === "IP" && level === "3" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 10) && network === "IP" && level === "3" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "3" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "3" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "3" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "3" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 16.5) && network === "Chico" && level === "3" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5.25) && network === "Chico" && level === "3" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 16.5) && network === "Chico" && level === "3" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5.25) && network === "Chico" && level === "3" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 16.5) && network === "WPN" && level === "3" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5.25) && network === "WPN" && level === "3" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 16.5) && network === "WPN" && level === "3" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5.25) && network === "WPN" && level === "3" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 16.5) && network === "PS.eu" && level === "4" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "PS.eu" && level === "4" && effmu === "A" && isTurbo)
    return true;
  if (
    FromTo(1, 27) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("deepstack") &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 16.5) &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("deepstack") &&
    network === "PS.eu" &&
    level === "4" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (FromTo(1, 11) && network === "PS.eu" && level === "4" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 4.4) && network === "PS.eu" && level === "4" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 16.5) && network === "Party" && level === "4" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "Party" && level === "4" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 11) && network === "Party" && level === "4" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "Party" && level === "4" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 5.5) && network === "888" && level === "4" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 16.5) && network === "888" && level === "4" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "888" && level === "4" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 10) && network === "PS.es" && level === "4" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5) && network === "PS.es" && level === "4" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "PS.es" && level === "4" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5) && network === "PS.es" && level === "4" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 22) && network === "GG" && level === "4" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 5.25) && network === "GG" && level === "4" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 5.25) && network === "GG" && level === "4" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 15) && network === "GG" && level === "4" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 20) && network === "IP" && level === "4" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 20) && network === "IP" && level === "4" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 20) && network === "IP" && level === "4" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 10) && network === "IP" && level === "4" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "4" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "4" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "4" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "4" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 22) && network === "Chico" && level === "4" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5.25) && network === "Chico" && level === "4" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 16.5) && network === "Chico" && level === "4" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5.25) && network === "Chico" && level === "4" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 5.25) && network === "WPN" && level === "4" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 16.5) && network === "WPN" && level === "4" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "WPN" && level === "4" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 5.25) && network === "WPN" && level === "4" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 22) && network === "PS.eu" && level === "5" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 7.5) && network === "PS.eu" && level === "5" && effmu === "A" && isTurbo)
    return true;
  if (
    FromTo(1, 27) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("deepstack") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 27) &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("deepstack") &&
    network === "PS.eu" &&
    level === "5" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (FromTo(1, 16.5) && network === "PS.eu" && level === "5" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "PS.eu" && level === "5" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 27) && network === "Party" && level === "5" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "Party" && level === "5" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 22) && network === "Party" && level === "5" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "Party" && level === "5" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 22) && network === "888" && level === "4" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 25) && network === "888" && level === "5" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 12) && network === "888" && level === "5" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 22) && network === "888" && level === "5" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 5.5) && network === "888" && level === "5" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 20) && network === "PS.es" && level === "5" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 10) && network === "PS.es" && level === "5" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 10) && network === "PS.es" && level === "5" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5) && network === "PS.es" && level === "5" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 22) && network === "GG" && level === "5" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 10.5) && network === "GG" && level === "5" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 22) && network === "GG" && level === "5" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 5.25) && network === "GG" && level === "5" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 30) && network === "IP" && level === "5" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 20) && network === "IP" && level === "5" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "IP" && level === "5" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 20) && network === "IP" && level === "5" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 20) && network === "IP" && level === "5" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 30) && network === "WNMX" && level === "5" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "5" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "5" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "5" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "5" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 22) && network === "Chico" && level === "5" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 10.5) && network === "Chico" && level === "5" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 22) && network === "Chico" && level === "5" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5.25) && network === "Chico" && level === "5" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 22) && network === "WPN" && level === "5" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 10.5) && network === "WPN" && level === "5" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 5.25) && network === "WPN" && level === "5" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 22) && network === "WPN" && level === "5" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 27) && network === "PS.eu" && level === "6" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 11) && network === "PS.eu" && level === "6" && effmu === "A" && isTurbo)
    return true;
  if (
    FromTo(1, 27) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal &&
    FLAGS("deepstack") &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "A" &&
    isNormal
  )
    return true;
  if (
    FromTo(1, 27) &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal &&
    FLAGS("deepstack") &&
    network === "PS.eu" &&
    level === "6" &&
    effmu === "B" &&
    isNormal
  )
    return true;
  if (FromTo(1, 22) && network === "PS.eu" && level === "6" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 7.5) && network === "PS.eu" && level === "6" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "Party" && level === "6" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "Party" && level === "6" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 27) && network === "Party" && level === "6" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 5.5) && network === "Party" && level === "6" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "888" && level === "6" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 12) && network === "888" && level === "6" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 25) && network === "888" && level === "6" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 12) && network === "888" && level === "6" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 20) && network === "PS.es" && level === "6" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 10) && network === "PS.es" && level === "6" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 20) && network === "PS.es" && level === "6" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 10) && network === "PS.es" && level === "6" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 27.5) && network === "GG" && level === "6" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 13) && network === "GG" && level === "6" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 22) && network === "GG" && level === "6" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 10.5) && network === "GG" && level === "6" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 30) && network === "IP" && level === "6" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 20) && network === "IP" && level === "6" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "IP" && level === "6" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 30) && network === "IP" && level === "6" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 20) && network === "IP" && level === "6" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 10) && network === "IP" && level === "6" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "6" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "6" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 30) && network === "WNMX" && level === "6" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 30) && network === "WNMX" && level === "6" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "6" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "6" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 27.5) && network === "Chico" && level === "6" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 13) && network === "Chico" && level === "6" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 10.5) && network === "Chico" && level === "6" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 22) && network === "Chico" && level === "6" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "WPN" && level === "6" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 10.5) && network === "WPN" && level === "6" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 13) && network === "WPN" && level === "6" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 27.5) && network === "WPN" && level === "6" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "PS.eu" && level === "7" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 16.5) && network === "PS.eu" && level === "7" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 27) && network === "PS.eu" && level === "7" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 11) && network === "PS.eu" && level === "7" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "Party" && level === "7" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 11) && network === "Party" && level === "7" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "Party" && level === "7" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 11) && network === "Party" && level === "7" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "888" && level === "7" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 12) && network === "888" && level === "7" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 33) && network === "888" && level === "7" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 12) && network === "888" && level === "7" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 30) && network === "PS.es" && level === "7" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 10) && network === "PS.es" && level === "7" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 20) && network === "PS.es" && level === "7" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 10) && network === "PS.es" && level === "7" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "GG" && level === "7" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 13) && network === "GG" && level === "7" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 20) && network === "GG" && level === "7" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 33) && network === "GG" && level === "7" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 30) && network === "IP" && level === "7" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 20) && network === "IP" && level === "7" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "IP" && level === "7" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 30) && network === "IP" && level === "7" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 20) && network === "IP" && level === "7" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 10) && network === "IP" && level === "7" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 30) && network === "WNMX" && level === "7" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "7" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "7" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 30) && network === "WNMX" && level === "7" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "7" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "7" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 33) && network === "Chico" && level === "7" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "Chico" && level === "7" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 13) && network === "Chico" && level === "7" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "Chico" && level === "7" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "WPN" && level === "7" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 20) && network === "WPN" && level === "7" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 33) && network === "WPN" && level === "7" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 13) && network === "WPN" && level === "7" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 4.4) && network === "PS.eu" && level === "0" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "PS.eu" && level === "8" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 16.5) && network === "PS.eu" && level === "8" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 16.5) && network === "PS.eu" && level === "8" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "PS.eu" && level === "8" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "Party" && level === "8" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 11) && network === "Party" && level === "8" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "Party" && level === "8" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 11) && network === "Party" && level === "8" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "888" && level === "8" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 12) && network === "888" && level === "8" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 12) && network === "888" && level === "8" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 33) && network === "888" && level === "8" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 30) && network === "PS.es" && level === "8" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "PS.es" && level === "8" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 30) && network === "PS.es" && level === "8" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 10) && network === "PS.es" && level === "8" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "GG" && level === "8" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 20) && network === "GG" && level === "8" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 20) && network === "GG" && level === "8" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 33) && network === "GG" && level === "8" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 50) && network === "WNMX" && level === "8" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 30) && network === "WNMX" && level === "8" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "8" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 30) && network === "WNMX" && level === "8" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "8" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "8" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 50) && network === "IP" && level === "8" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 30) && network === "IP" && level === "8" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "IP" && level === "8" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 30) && network === "IP" && level === "8" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 20) && network === "IP" && level === "8" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 10) && network === "IP" && level === "8" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 33) && network === "WPN" && level === "8" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 20) && network === "WPN" && level === "8" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 33) && network === "WPN" && level === "8" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 20) && network === "WPN" && level === "8" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 33) && network === "Chico" && level === "8" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "Chico" && level === "8" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "Chico" && level === "8" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "Chico" && level === "8" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 44) && network === "PS.eu" && level === "9" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "PS.eu" && level === "9" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "PS.eu" && level === "9" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 16.5) && network === "PS.eu" && level === "9" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 22) && network === "Party" && level === "9" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 44) && network === "Party" && level === "9" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "Party" && level === "9" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 11) && network === "Party" && level === "9" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 44) && network === "888" && level === "9" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 16.5) && network === "888" && level === "9" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 12) && network === "888" && level === "9" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 33) && network === "888" && level === "9" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 30) && network === "PS.es" && level === "9" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "PS.es" && level === "9" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 30) && network === "PS.es" && level === "9" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "PS.es" && level === "9" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 50) && network === "GG" && level === "9" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 33) && network === "GG" && level === "9" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 20) && network === "GG" && level === "9" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 33) && network === "GG" && level === "9" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 70) && network === "IP" && level === "9" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 40) && network === "IP" && level === "9" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "IP" && level === "9" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 50) && network === "IP" && level === "9" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 30) && network === "IP" && level === "9" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 10) && network === "IP" && level === "9" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 70) && network === "WNMX" && level === "9" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 40) && network === "WNMX" && level === "9" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "9" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 50) && network === "WNMX" && level === "9" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 30) && network === "WNMX" && level === "9" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "9" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 55) && network === "WPN" && level === "9" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 33) && network === "WPN" && level === "9" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 33) && network === "WPN" && level === "9" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 20) && network === "WPN" && level === "9" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 55) && network === "Chico" && level === "9" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "Chico" && level === "9" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "Chico" && level === "9" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "Chico" && level === "9" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 44) && network === "PS.eu" && level === "10" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "PS.eu" && level === "10" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 44) && network === "PS.eu" && level === "10" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "PS.eu" && level === "10" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 44) && network === "Party" && level === "10" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "Party" && level === "10" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 44) && network === "Party" && level === "10" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "Party" && level === "10" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 44) && network === "888" && level === "10" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 16.5) && network === "888" && level === "10" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 44) && network === "888" && level === "10" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 16.5) && network === "888" && level === "10" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 30) && network === "PS.es" && level === "10" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "PS.es" && level === "10" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 30) && network === "PS.es" && level === "10" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "PS.es" && level === "10" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 50) && network === "GG" && level === "10" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 33) && network === "GG" && level === "10" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 33) && network === "GG" && level === "10" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 50) && network === "GG" && level === "10" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 70) && network === "WNMX" && level === "10" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 50) && network === "WNMX" && level === "10" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 15) && network === "WNMX" && level === "10" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 70) && network === "WNMX" && level === "10" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 40) && network === "WNMX" && level === "10" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 10) && network === "WNMX" && level === "10" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 70) && network === "IP" && level === "10" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 50) && network === "IP" && level === "10" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 15) && network === "IP" && level === "10" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 70) && network === "IP" && level === "10" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 40) && network === "IP" && level === "10" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 10) && network === "IP" && level === "10" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 55) && network === "Chico" && level === "10" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "Chico" && level === "10" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 55) && network === "Chico" && level === "10" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "Chico" && level === "10" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 55) && network === "WPN" && level === "10" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "WPN" && level === "10" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 55) && network === "WPN" && level === "10" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "WPN" && level === "10" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 55) && network === "PS.eu" && level === "11" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "PS.eu" && level === "11" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 44) && network === "PS.eu" && level === "11" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "PS.eu" && level === "11" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 66) && network === "Party" && level === "11" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "Party" && level === "11" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 44) && network === "Party" && level === "11" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "Party" && level === "11" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 55) && network === "888" && level === "11" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 16.5) && network === "888" && level === "11" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 16.5) && network === "888" && level === "11" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 44) && network === "888" && level === "11" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 50) && network === "PS.es" && level === "11" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "PS.es" && level === "11" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 30) && network === "PS.es" && level === "11" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "PS.es" && level === "11" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 66) && network === "GG" && level === "11" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 33) && network === "GG" && level === "11" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 33) && network === "GG" && level === "11" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 50) && network === "GG" && level === "11" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 70) && network === "IP" && level === "11" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 50) && network === "IP" && level === "11" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 20) && network === "IP" && level === "11" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 70) && network === "IP" && level === "11" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 50) && network === "IP" && level === "11" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 15) && network === "IP" && level === "11" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 70) && network === "WNMX" && level === "11" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 50) && network === "WNMX" && level === "11" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "11" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 70) && network === "WNMX" && level === "11" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 50) && network === "WNMX" && level === "11" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 15) && network === "WNMX" && level === "11" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 66) && network === "WPN" && level === "11" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "WPN" && level === "11" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 55) && network === "WPN" && level === "11" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "WPN" && level === "11" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 66) && network === "Chico" && level === "11" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "Chico" && level === "11" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "Chico" && level === "11" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 55) && network === "Chico" && level === "11" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 55) && network === "PS.eu" && level === "12" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "PS.eu" && level === "12" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 55) && network === "PS.eu" && level === "12" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "PS.eu" && level === "12" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 66) && network === "Party" && level === "12" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "Party" && level === "12" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(11, 66) && network === "Party" && level === "12" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "Party" && level === "12" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 55) && network === "888" && level === "12" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "888" && level === "12" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 55) && network === "888" && level === "12" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 16.5) && network === "888" && level === "12" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 50) && network === "PS.es" && level === "12" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 30) && network === "PS.es" && level === "12" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 50) && network === "PS.es" && level === "12" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 20) && network === "PS.es" && level === "12" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 80) && network === "GG" && level === "12" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 50) && network === "GG" && level === "12" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 33) && network === "GG" && level === "12" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 66) && network === "GG" && level === "12" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 70) && network === "WNMX" && level === "12" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 50) && network === "WNMX" && level === "12" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "12" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 70) && network === "WNMX" && level === "12" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 50) && network === "WNMX" && level === "12" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "12" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 70) && network === "IP" && level === "12" && effmu === "A" && isNormal) return true;
  if (FromTo(1, 50) && network === "IP" && level === "12" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 20) && network === "IP" && level === "12" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 70) && network === "IP" && level === "12" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 50) && network === "IP" && level === "12" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 20) && network === "IP" && level === "12" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 80) && network === "WPN" && level === "12" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 50) && network === "WPN" && level === "12" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 66) && network === "WPN" && level === "12" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "WPN" && level === "12" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 80) && network === "Chico" && level === "12" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 50) && network === "Chico" && level === "12" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 33) && network === "Chico" && level === "12" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 66) && network === "Chico" && level === "12" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 109) && network === "PS.eu" && level === "13" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "PS.eu" && level === "13" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 55) && network === "PS.eu" && level === "13" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "PS.eu" && level === "13" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 109) && network === "Party" && level === "13" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "Party" && level === "13" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 77) && network === "Party" && level === "13" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "Party" && level === "13" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 109) && network === "888" && level === "13" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "888" && level === "13" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 55) && network === "888" && level === "13" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 22) && network === "888" && level === "13" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 50) && network === "PS.es" && level === "13" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 30) && network === "PS.es" && level === "13" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 50) && network === "PS.es" && level === "13" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 30) && network === "PS.es" && level === "13" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 110) && network === "GG" && level === "13" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 88) && network === "GG" && level === "13" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 80) && network === "GG" && level === "13" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 50) && network === "GG" && level === "13" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 100) && network === "WNMX" && level === "13" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 70) && network === "WNMX" && level === "13" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "13" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 70) && network === "WNMX" && level === "13" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 50) && network === "WNMX" && level === "13" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "13" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 100) && network === "IP" && level === "13" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 70) && network === "IP" && level === "13" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 20) && network === "IP" && level === "13" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 70) && network === "IP" && level === "13" && effmu === "B" && isNormal) return true;
  if (FromTo(1, 50) && network === "IP" && level === "13" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 20) && network === "IP" && level === "13" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 110) && network === "WPN" && level === "13" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 88) && network === "WPN" && level === "13" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 80) && network === "WPN" && level === "13" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 50) && network === "WPN" && level === "13" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 110) && network === "Chico" && level === "13" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 88) && network === "Chico" && level === "13" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 80) && network === "Chico" && level === "13" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 50) && network === "Chico" && level === "13" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 109) && network === "PS.eu" && level === "14" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 44) && network === "PS.eu" && level === "14" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 27) && network === "PS.eu" && level === "14" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 109) && network === "PS.eu" && level === "14" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "PS.eu" && level === "14" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 109) && network === "Party" && level === "14" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 55) && network === "Party" && level === "14" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 109) && network === "Party" && level === "14" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "Party" && level === "14" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 160) && network === "888" && level === "14" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 55) && network === "888" && level === "14" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 109) && network === "888" && level === "14" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 33) && network === "888" && level === "14" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 100) && network === "PS.es" && level === "14" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 50) && network === "PS.es" && level === "14" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 50) && network === "PS.es" && level === "14" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 30) && network === "PS.es" && level === "14" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 110) && network === "GG" && level === "14" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 110) && network === "GG" && level === "14" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 110) && network === "GG" && level === "14" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 110) && network === "GG" && level === "14" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 100) && network === "WNMX" && level === "14" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 100) && network === "WNMX" && level === "14" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 50) && network === "WNMX" && level === "14" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 100) && network === "WNMX" && level === "14" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 70) && network === "WNMX" && level === "14" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 20) && network === "WNMX" && level === "14" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 100) && network === "IP" && level === "14" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 100) && network === "IP" && level === "14" && effmu === "A" && isTurbo) return true;
  if (FromTo(1, 50) && network === "IP" && level === "14" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 100) && network === "IP" && level === "14" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 70) && network === "IP" && level === "14" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 20) && network === "IP" && level === "14" && effmu === "B" && isSuperTurbo)
    return true;
  if (FromTo(1, 110) && network === "WPN" && level === "14" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 110) && network === "WPN" && level === "14" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 110) && network === "WPN" && level === "14" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 88) && network === "WPN" && level === "14" && effmu === "B" && isTurbo) return true;
  if (FromTo(1, 110) && network === "Chico" && level === "14" && effmu === "A" && isNormal)
    return true;
  if (FromTo(1, 110) && network === "Chico" && level === "14" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 110) && network === "Chico" && level === "14" && effmu === "B" && isNormal)
    return true;
  if (FromTo(1, 88) && network === "Chico" && level === "14" && effmu === "B" && isTurbo)
    return true;
  if (FromTo(1, 109) && network === "PS.eu" && level === "15" && isNormal) return true;
  if (FromTo(1, 55) && network === "PS.eu" && level === "15" && isTurbo) return true;
  if (FromTo(1, 33) && network === "PS.eu" && level === "15" && isSuperTurbo) return true;
  if (FromTo(1, 109) && network === "Party" && level === "15" && isNormal) return true;
  if (FromTo(1, 55) && network === "Party" && level === "15" && isTurbo) return true;
  if (FromTo(1, 160) && network === "888" && level === "15" && isNormal) return true;
  if (FromTo(1, 55) && network === "888" && level === "15" && isTurbo) return true;
  if (FromTo(1, 125) && network === "PS.es" && level === "15" && isNormal) return true;
  if (FromTo(1, 50) && network === "PS.es" && level === "15" && isTurbo) return true;
  if (FromTo(1, 110) && network === "GG" && level === "15" && isNormal) return true;
  if (FromTo(1, 110) && network === "GG" && level === "15" && isTurbo) return true;
  if (FromTo(1, 100) && network === "WNMX" && level === "15" && isNormal) return true;
  if (FromTo(1, 100) && network === "WNMX" && level === "15" && isTurbo) return true;
  if (FromTo(1, 50) && network === "WNMX" && level === "15" && isSuperTurbo) return true;
  if (FromTo(1, 100) && network === "IP" && level === "15" && isNormal) return true;
  if (FromTo(1, 100) && network === "IP" && level === "15" && isTurbo) return true;
  if (FromTo(1, 50) && network === "IP" && level === "15" && isSuperTurbo) return true;
  if (FromTo(1, 110) && network === "WPN" && level === "15" && isNormal) return true;
  if (FromTo(1, 110) && network === "WPN" && level === "15" && isTurbo) return true;
  if (FromTo(1, 110) && network === "Chico" && level === "15" && isNormal) return true;
  if (FromTo(1, 110) && network === "Chico" && level === "15" && isTurbo) return true;
  if (FromTo(1, 10000) && network === "IP" && level === "16" && effmu === "A" && isSuperTurbo)
    return true;
  if (FromTo(1, 10000) && network === "IP" && level === "16" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 10000) && network === "Chico" && level === "16" && effmu === "A" && isTurbo)
    return true;
  if (FromTo(1, 10000) && network === "Chico" && level === "16" && effmu === "A" && isSuperTurbo)
    return true;

  return false;
};

module.exports = {
  filter,
};
