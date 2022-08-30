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

  const level = validateNumber(ruleLevel);
  const effmu = ruleLevel.replace(level, "").replace("-", "");

  if (!name) return false;

  if (FromTo(1, 1111111) && network === "PS.eu") return true;
  if (FromTo(1, 111111) && network === "IP") return true;
  if (FromTo(1, 111111) && network === "Chico") return true;
  if (FromTo(1, 111111) && network === "PS.es") return true;
  if (FromTo(1, 111111) && network === "Party") return true;
  if (FromTo(1, 111111) && network === "GG") return true;
  if (FromTo(1, 111111) && network === "888") return true;
  if (FromTo(1, 111111) && network === "WNMX") return true;
  if (FromTo(1, 111111) && network === "WPN") return true;

  return false;
};

module.exports = {
  filter,
};
