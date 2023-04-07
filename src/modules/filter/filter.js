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
  const { isTurbo: isTurboS } = require("../../helpers/isTurbo");
  const { isNormal: isNormalS } = require("../../helpers/isNormal")
  const { isOffpeak: isOffpeakQ } = require("../../helpers/isOffpeak");
  const {validateNumber} = require('../../helpers/validateNumber')
  
  const filter = (ruleLevel, offpeak, tournament, isGetTournaments = false) => {
    const name = tournament["@name"]?.toLowerCase(),
      network = getNetwork(tournament["@network"]),
      bid = Number(tournament["@usdBid"]),
      prizepool = Math.round(Number(tournament["@usdPrizepool"])),
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
    const isOffpeak = isOffpeakQ(tournament, offpeak, Number(tournament['@realDuration'] ?? 0) * 1000);
    const isSuperTurbo = isSuperTurboS(tournament);
    const isKo = isNormalS(tournament);
    const isNormal = !isTurbo && !isSuperTurbo;

    const level = (ruleLevel[0] === 'A' || ruleLevel[0] === 'B')? ruleLevel[0] : validateNumber(ruleLevel);
    const effmu = ruleLevel.replace(level, "").replace("-", "");
  
    if (!name || !bid) return { valid: false, guarantee: 1, rules: false };

    if((FromTo(0,1000000))
    && network === 'PS.eu') return { valid: true, rules: true, guarantee: 1, color: "blue" };
    
    return { valid: false, guarantee: 1, rules: false };
  };
  
  module.exports = {
    filter,
  };