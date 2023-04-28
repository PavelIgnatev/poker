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
if((Flags("sat"))&& effmu === 'A') {
    return { valid: false, guarantee: 1, rules: false };
  };
if((Flags("od"))&& effmu === 'A') {
    return { valid: false, guarantee: 1, rules: false };
  };
if((Structure("!NL"))&& effmu === 'A') {
    return { valid: false, guarantee: 1, rules: false };
  };
if((Game("!H"))&& effmu === 'A') {
    return { valid: false, guarantee: 1, rules: false };
  };
if((Class("!scheduled"))&& effmu === 'A') {
    return { valid: false, guarantee: 1, rules: false };
  };
if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(3.3))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(11))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  };
if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(4.4))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
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

    
    return { valid: false, guarantee: 1, rules: false };
  };
  
  module.exports = {
    filter,
  };