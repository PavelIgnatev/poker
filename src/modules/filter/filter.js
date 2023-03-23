const { getNetwork } = require("../../helpers/getNetwork");
  const {
    BidEqual: BidEqualQ,
    BidFrom: BidFromQ,
    BidTo: BidToQ,
    PrizepoolEqual: PrizepoolEqualQ,
    PrizepoolFrom: PrizepoolFromQ,
    Name: NameQ,
    PrizepoolTo: PrizepoolToQ,
    StartDay: StartDayQ,
    Entrants: EntrantsQ,
    Flags: FlagsQ,
  } = require("../../helpers/curry");
  const { isSuperTurbo: isSuperTurboS } = require("../../helpers/isSuperTurbo");
  const { isTurbo: isTurboS } = require("../../helpers/isTurbo");
  const { isNormal: isNormalS } = require("../../helpers/isNormal")
  const {validateNumber} = require('../../helpers/validateNumber')
  
  const filter = (ruleLevel, tournament, isGetTournaments = false) => {
    const name = tournament["@name"]?.toLowerCase(),
      network = getNetwork(tournament["@network"]),
      bid = Number(tournament["@usdBid"]),
      prizepool = Math.round(Number(tournament["@usdPrizepool"])),
      weekDay = tournament["@getWeekday"],

      BidEqual = BidEqualQ(bid),
      BidFrom = BidFromQ(bid),
      BidTo = BidToQ(bid),
      PrizepoolEqual = PrizepoolEqualQ(prizepool),
      PrizepoolFrom = PrizepoolFromQ(prizepool),
      PrizepoolTo = PrizepoolToQ(prizepool),
      Entrants = EntrantsQ(tournament?.["@totalEntrants"] ?? 0),
      StartDay = StartDayQ(weekDay),
      Name = NameQ(name),
      Flags = FlagsQ(tournament);

    const isTurbo = isTurboS(tournament);
    const isSuperTurbo = isSuperTurboS(tournament);
    const isKo = isNormalS(tournament);
    const isNormal = !isTurbo && !isSuperTurbo;

    const level = validateNumber(ruleLevel);
    const effmu = 'A'
  
    if (!name || !bid) return { valid: false, guarantee: 1, rules: false };

    
    
    return { valid: false, guarantee: 1, rules: false };
  };
  
  module.exports = {
    filter,
  };