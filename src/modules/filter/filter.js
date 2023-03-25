const { getNetwork } = require("../../helpers/getNetwork");
  const {
    BidEqual: BidEqualQ,
    BidFrom: BidFromQ,
    BidTo: BidToQ,
    PrizepoolEqual: PrizepoolEqualQ,
    PrizepoolFrom: PrizepoolFromQ,
    PrizepoolTo: PrizepoolToQ,
    EntrantsEqual: EntrantsEqualQ,
    EntrantsFrom: EntrantsFromQ,
    EntrantsTo: EntrantsToQ,
    AbilityEqual: AbilityEqualQ,
    AbilityFrom: AbilityFromQ,
    AbilityTo: AbilityToQ,
    Name: NameQ,
    NotName: NotNameQ,
    StartDay: StartDayQ,
    Flags: FlagsQ,
    Class: ClassQ,
    Structure: StructureQ,
    Game: GameQ,
  } = require("../../helpers/curry");
  const { isSuperTurbo: isSuperTurboS } = require("../../helpers/isSuperTurbo");
  const { isTurbo: isTurboS } = require("../../helpers/isTurbo");
  const { isNormal: isNormalS } = require("../../helpers/isNormal")
  const {validateNumber} = require('../../helpers/validateNumber')
  
  const filter = (ruleLevel, tournament, isGetTournaments = false) => {
    const ability = !tournament['@ability'] || tournament['@ability'] === '-' ? 0 : tournament['@ability']

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
      EntrantsEqual = EntrantsEqualQ(tournament?.["@totalEntrants"] ?? 0),
      EntrantsFrom = EntrantsFromQ(tournament?.["@totalEntrants"] ?? 0),
      EntrantsTo = EntrantsToQ(tournament?.["@totalEntrants"] ?? 0),
      AbilityEqual = AbilityEqualQ(ability),
      AbilityFrom = AbilityFromQ(ability),
      AbilityTo = AbilityToQ(ability),
      StartDay = StartDayQ(weekDay),
      Name = NameQ(name),
      NotName = NotNameQ(name),
      Flags = FlagsQ(tournament),
      Class = ClassQ(tournament),
      Structure = StructureQ(tournament),
      Game = GameQ(tournament);

    const isTurbo = isTurboS(tournament);
    const isSuperTurbo = isSuperTurboS(tournament);
    const isKo = isNormalS(tournament);
    const isNormal = !isTurbo && !isSuperTurbo;

    const level = validateNumber(ruleLevel);
    const effmu = 'A'
  
    if (!name || !bid) return { valid: false, guarantee: 1, rules: false };

    if((BidFrom(1))&& level === '1'&& effmu === 'A') return { valid: true, rules: true, guarantee: 1 };
    
    return { valid: false, guarantee: 1, rules: false };
  };
  
  module.exports = {
    filter,
  };