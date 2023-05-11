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
    StartRegEqual: StartRegEqualQ,
    StartRegFrom: StartRegFromQ,
    StartRegTo: StartRegToQ,
    LateRegEqual: LateRegEqualQ,
    LateRegFrom: LateRegFromQ,
    LateRegTo: LateRegToQ,
    TicketEqual: TicketEqualQ,
    TicketFrom: TicketFromQ,
    TicketTo: TicketToQ,
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
      StartRegEqual = StartRegEqualQ(tournament["@msStartForRule"]),
      StartRegFrom = StartRegFromQ(tournament["@msStartForRule"]),
      StartRegTo = StartRegToQ(tournament["@msStartForRule"]),
      LateRegEqual = LateRegEqualQ(tournament["@msLateForRule"]),
      LateRegFrom = LateRegFromQ(tournament["@msLateForRule"]),
      LateRegTo = LateRegToQ(tournament["@msLateForRule"]),
      TicketEqual = TicketEqualQ(tournament?.["@tickets"] ?? 0),
      TicketFrom = TicketFromQ(tournament?.["@tickets"] ?? 0),
      TicketTo = TicketToQ(tournament?.["@tickets"] ?? 0),
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
  
    if (!name || !bid) {
      return { valid: false, guarantee: 1, rules: false };
    };


    if((BidFrom(0))&& effmu === 'A'&& isSuperTurbo) {
    return { valid: false, guarantee: 1, rules: false };
  };
if((Name("speed racer"))&& network === 'GGNetwork'&& effmu === 'A') {
    return { valid: false, guarantee: 1, rules: false };
  };
if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(3.3))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(4.4))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4.4))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(16.5))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(5.5))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5.5))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5.5))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(7.5))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5.5))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(11))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(44))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(11))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(11))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'GGNetwork'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'GGNetwork'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(21))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(31))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'GGNetwork'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'GGNetwork'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(7))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'Winamax.fr'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'Winamax.fr'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5))&& network === 'Winamax.fr'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === '888Poker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(11))&& network === '888Poker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(11))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === '888Poker'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5))&& network === '888Poker'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(11))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(11))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(16))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(11))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(7))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(15))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'iPoker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'iPoker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'iPoker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'iPoker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'iPoker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'iPoker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'iPoker'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'iPoker'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'iPoker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'iPoker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'iPoker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'iPoker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(7))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(4))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(16.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(16.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(7))&& network === 'GGNetwork'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(54))&& network === 'GGNetwork'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'GGNetwork'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12.6))&& network === 'GGNetwork'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(7))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(50))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2.5))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(4))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(7))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(22))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(7))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(7))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(4))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(22))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(8))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(60))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12.6))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(6))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(33))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(7.5))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(7))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(4))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(108))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(21))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(14))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(100))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(22))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isTurbo&& !isKo && (BidTo(22))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isTurbo&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(109))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(6))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(33))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(21))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(11))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(162))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(8))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(20))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(150))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(20))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(31))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(25))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(200))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(7))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(50))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(30))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(215))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(8))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(33))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(12))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(12))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(31))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(25))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(22))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(215))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(20))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(150))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(10))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(54))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(20))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(200))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(10))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(50))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(10))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(50))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(22))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(215))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(22))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(10))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(22))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(215))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(25))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(22))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(215))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(22))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(160))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(25))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(10))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'Chico'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'Chico'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'Chico'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'Chico'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'Chico'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'Chico'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'Chico'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'Chico'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'Chico'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'Chico'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'Chico'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'Chico'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'Chico'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'Chico'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'Chico'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(7))&& network === 'Chico'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(8))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(60))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12.6))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(21))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(12))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(31))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(22))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(160))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(25))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(10))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PokerStars(FR-ES-PT)'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'PokerStars(FR-ES-PT)'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PokerStars(FR-ES-PT)'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'PokerStars(FR-ES-PT)'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'PokerStars(FR-ES-PT)'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'PokerStars(FR-ES-PT)'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'PokerStars(FR-ES-PT)'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'PokerStars(FR-ES-PT)'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PokerStars(FR-ES-PT)'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'PokerStars(FR-ES-PT)'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PokerStars(FR-ES-PT)'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'PokerStars(FR-ES-PT)'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'PokerStars(FR-ES-PT)'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'PokerStars(FR-ES-PT)'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'PokerStars(FR-ES-PT)'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(7))&& network === 'PokerStars(FR-ES-PT)'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(8))&& network === 'PokerStars(FR-ES-PT)'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(60))&& network === 'PokerStars(FR-ES-PT)'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'PokerStars(FR-ES-PT)'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12.6))&& network === 'PokerStars(FR-ES-PT)'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'PokerStars(FR-ES-PT)'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PokerStars(FR-ES-PT)'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'PokerStars(FR-ES-PT)'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(21))&& network === 'PokerStars(FR-ES-PT)'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'PokerStars(FR-ES-PT)'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PokerStars(FR-ES-PT)'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(12))&& network === 'PokerStars(FR-ES-PT)'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'PokerStars(FR-ES-PT)'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'PokerStars(FR-ES-PT)'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(31))&& network === 'PokerStars(FR-ES-PT)'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(22))&& network === 'PokerStars(FR-ES-PT)'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(160))&& network === 'PokerStars(FR-ES-PT)'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(25))&& network === 'PokerStars(FR-ES-PT)'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'PokerStars(FR-ES-PT)'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(10))&& network === 'PokerStars(FR-ES-PT)'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'PokerStars(FR-ES-PT)'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PartyPoker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'PartyPoker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PartyPoker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'PartyPoker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'PartyPoker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'PartyPoker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'PartyPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'PartyPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PartyPoker'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'PartyPoker'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PartyPoker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'PartyPoker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'PartyPoker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'PartyPoker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'PartyPoker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(7))&& network === 'PartyPoker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(8))&& network === 'PartyPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(60))&& network === 'PartyPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(3))&& network === 'PartyPoker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12.6))&& network === 'PartyPoker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'PartyPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PartyPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'PartyPoker'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(21))&& network === 'PartyPoker'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(15))&& network === 'PartyPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PartyPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(12))&& network === 'PartyPoker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'PartyPoker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'PartyPoker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(31))&& network === 'PartyPoker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(22))&& network === 'PartyPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(160))&& network === 'PartyPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(25))&& network === 'PartyPoker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'PartyPoker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(10))&& network === 'PartyPoker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'PartyPoker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(11))&& network === 'PokerStars'&& effmu === 'A'&& isNormal && (Name("storm"))&& network === 'PokerStars'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(22))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal && (StartDay("Friday"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(22))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal && (StartDay("Saturday"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(33))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal && (StartDay("Friday"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(33))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal && (StartDay("Saturday"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(55))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal && (StartDay("Friday"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(55))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal && (StartDay("Saturday"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(82))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal && (StartDay("Friday"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal && (StartRegFrom(18000000))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal && (StartRegTo(50400000))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("builder"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (BidEqual(162))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (StartRegFrom(79200000))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (StartRegTo(18000000))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (StartDay("Friday"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("builder"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (BidEqual(162))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (StartRegFrom(79200000))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (StartRegTo(18000000))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (StartDay("Saturday"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("cooldown"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal && (BidEqual(109))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("builder"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal && (BidEqual(215))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal && (StartRegFrom(18000000))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal && (StartRegTo(50400000))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("cooldown"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal && (BidEqual(109))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("marathon"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal && (BidEqual(55))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("masters"))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(25))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("masters"))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(25))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("main"))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(52.5))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("masters"))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(150))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("main"))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(388))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("masters"))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(150))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(210))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartRegFrom(39600000))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartRegTo(61200000))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(388))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(150))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("masters"))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(210))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (StartRegFrom(39600000))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (StartRegTo(61200000))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(525))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(388))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(25))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (Name("half price"))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(25))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("half price"))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(125))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(50))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("monstr"))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (StartRegFrom(79200000))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (StartRegTo(21600000))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(50))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("monstr"))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (StartRegFrom(79200000))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (StartRegTo(21600000))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(50))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("monstr"))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartRegFrom(79200000))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartRegTo(21600000))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(33))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("rumble"))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(109))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal && (Name("bigshot"))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(55))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal && (StartDay("Sunday"))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(109))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (PrizepoolFrom(300000))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(215))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (PrizepoolFrom(400000))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(50))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("daily main"))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(100))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(100))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(100))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("slam ko"))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("100"))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((Name("main"))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(109))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(109))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(109))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(109))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2.2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(27))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2.2))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(27))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(7.5))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("progressive ko"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(4))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(2))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(5))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(33))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(6))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(10))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(109))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidEqual(52.5))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };

    
    return { valid: false, guarantee: 1, rules: false };
  };
  
  module.exports = {
    filter,
  };