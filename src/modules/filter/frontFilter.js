'use strict';

/**
 * Возвращает сокращенное название network из полного
 * @param {string} network network
 * @return {string} Сокращенное название network
 */

const getNetwork$3 = (network) => {
  return network;
};

var getNetwork_1 = { getNetwork: getNetwork$3 };

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const BidEqual = curry((bid, equal) => Number(bid) === Number(equal));
const BidFrom = curry((bid, from) => Number(bid) >= Number(from));
const BidTo = curry((bid, to) => Number(bid) <= Number(to));
const PrizepoolEqual = curry((prizepool, equal) => Number(prizepool) === Number(equal));
const PrizepoolFrom = curry((prizepool, from) => Number(prizepool) >= Number(from));
const PrizepoolTo = curry((prizepool, to) => Number(prizepool) <= Number(to));
const EntrantsEqual = curry((entrants, equal) => Number(entrants) === Number(equal));
const EntrantsFrom = curry((entrants, from) => Number(entrants) >= Number(from));
const EntrantsTo = curry((entrants, to) => Number(entrants) <= Number(to));
const AbilityEqual = curry((ability, equal) => Number(ability) === Number(equal));
const AbilityFrom = curry((ability, from) => Number(ability) >= Number(from));
const AbilityTo = curry((ability, to) => Number(ability) <= Number(to));
const StartRegEqual = curry((startRegMs, equal) => Number(startRegMs) === Number(equal));
const StartRegFrom = curry((startRegMs, from) => Number(startRegMs) >= Number(from));
const StartRegTo = curry((startRegMs, to) => Number(startRegMs) <= Number(to));
const LateRegEqual = curry((lateRegMs, equal) => Number(lateRegMs) === Number(equal));
const LateRegFrom = curry((lateRegMs, from) => Number(lateRegMs) >= Number(from));
const LateRegTo = curry((lateRegMs, to) => Number(lateRegMs) <= Number(to));
const TicketEqual = curry((ticket, equal) => Number(ticket) === Number(equal));
const TicketFrom = curry((ticket, from) => Number(ticket) >= Number(from));
const TicketTo = curry((ticket, to) => Number(ticket) <= Number(to));
const StartDay = curry((realDay, day) => String(realDay) === String(day));
const Name = curry((name, str) => name.toLowerCase().includes(str.toLowerCase()));
const NotName = curry((name, str) => !name.toLowerCase().includes(str.toLowerCase()));

const Flags = curry((tournament, flags) => {
  const isNotRule = flags?.includes("!");
  const rule = tournament?.[`@${flags.replace("!", "")}`] ?? false;

  return isNotRule ? !rule : rule;
});
const Class = curry((tournament, classes) => {
  const isNotRule = classes?.includes("!");
  const rule = tournament?.[`@${classes.replace("!", "")}`] ?? false;

  return isNotRule ? !rule : rule;
});
const Structure = curry((tournament, structure) => {
  const isNotRule = structure?.includes("!");
  const rule = tournament?.[`@${structure.replace("!", "")}`] ?? false;

  return isNotRule ? !rule : rule;
});
const Game = curry((tournament, game) => {
  const isNotRule = game?.includes("!");
  const rule = tournament?.[`@${game.replace("!", "")}`] ?? false;

  return isNotRule ? !rule : rule;
});

var curry_1 = {
  curry,
  BidEqual,
  BidFrom,
  BidTo,
  PrizepoolEqual,
  PrizepoolFrom,
  PrizepoolTo,
  EntrantsEqual,
  EntrantsFrom,
  EntrantsTo,
  AbilityEqual,
  AbilityFrom,
  AbilityTo,
  TicketEqual,
  TicketFrom,
  TicketTo,
  Name,
  NotName,
  StartDay,
  Flags,
  Class,
  Game,
  Structure,
  StartRegEqual,
  StartRegFrom,
  StartRegTo,
  LateRegEqual,
  LateRegFrom,
  LateRegTo,
};

/**
 * Возвращае true, если турнир является super turbo
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир является super turbo
 */

const isSuperTurbo$1 = (tournament) => {
  const name = (tournament["@name"] ?? "").toLowerCase();
  const superturbo = tournament["@flags"]?.includes("ST") || name?.includes("hyper");

  return superturbo;
};

var isSuperTurbo_1 = { isSuperTurbo: isSuperTurbo$1 };

/**
 * Возвращае true, если турнир является satellite
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир является super turbo
 */

const { getNetwork: getNetwork$2 } = getNetwork_1;

const isSat$1 = (tournament) => {
  const name = tournament["@name"]?.toLowerCase();
  const network = getNetwork$2(tournament["@network"]);
  let sat = !!tournament["@flags"]?.includes("SAT");

  if (!sat && name) {
    if (network === "GGNetwork") {
      sat =
        name.includes(" seats") ||
        name.includes("seats ") ||
        name.includes(" seat") ||
        name.includes("seat ") ||
        name.includes(" qualifier") ||
        name.includes("qualifier ") ||
        name.includes(" step") ||
        name.includes("step ") ||
        (name.includes(" sat") && !name.includes(" satu")) ||
        name.includes("sat  ");
    } else if (network === "Winamax.fr") {
      sat =
        (name.includes(" sat") && !name.includes(" satu")) ||
        name.includes("sat  ") ||
        name.includes("satellite") ||
        name.includes("qualif") ||
        name.includes("last chance") ||
        name.includes("hit&run");
    } else if (network === "WPN") {
      sat =
        (name.includes(" sat") && !name.includes(" satu")) ||
        name.includes("sat  ") ||
        name.includes("satellite") ||
        name.includes("seat") ||
        name.includes(" qualifier") ||
        name.includes("qualifier ");
    } else if (network === "iPoker") {
      sat =
        name.includes(" seats") ||
        name.includes("seats ") ||
        (name.includes(" sat") && !name.includes(" satu")) ||
        name.includes("sat  ");
    }
  }

  return !!sat;
};

var IsSat = { isSat: isSat$1 };

const { getNetwork: getNetwork$1 } = getNetwork_1;
const { isSat } = IsSat;
const { isSuperTurbo } = isSuperTurbo_1;

/**
 * Возвращае true, если турнир является turbo
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир является turbo
 */

// пока корректно, ждем ответ
const isTurbo = (tournament) => {
  let flags = tournament["@flags"];
  const name = (tournament["@name"] ?? "").toLowerCase();
  const network = getNetwork$1(tournament["@network"]);
  const superturbo = isSuperTurbo(tournament);
  const sat = isSat(tournament);
  if ((sat && flags) || flags?.includes("SAT")) flags = flags.replace("SAT", "");

  const turbo =
    (flags?.includes("T") ||
      name?.includes("turbo") ||
      (network === "PokerStars" && name?.includes("hot"))) &&
    !superturbo;

  return turbo;
};

var isTurbo_1 = { isTurbo };

/**
 * Возвращае true, если турнир является normal
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир является normal
 */

const isNormal = (tournament) => {
  const name = (tournament["@name"] ?? "").toLowerCase();

  return !!(tournament["@flags"]?.includes("B") || name?.includes("bounty"));
};

var isNormal_1 = { isNormal };

const validateNumber$1 = (value) => {
  return value
    .replace(/[^\d.]*/g, "")
    .replace(/([.])[.]+/g, "$1")
    .replace(/^[^\d]*(\d+([.]\d{0,5})?).*$/g, "$1");
};
var validateNumber_1 = { validateNumber: validateNumber$1 };

const { getNetwork } = getNetwork_1;
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
  } = curry_1;
  const { isSuperTurbo: isSuperTurboS } = isSuperTurbo_1;
  const { isTurbo: isTurboS } = isTurbo_1;
  const { isNormal: isNormalS } = isNormal_1;
  const {validateNumber} = validateNumber_1;
  
  const filter = (ruleLevel, tournament, isGetTournaments = false) => {
    const ability = !tournament['@ability'] || tournament['@ability'] === '-' ? 0 : tournament['@ability'];

    const name = tournament["@name"]?.toLowerCase(),
      network = getNetwork(tournament["@network"]),
      bid = Number(tournament["@usdBid"]),
      prizepool = Math.round(Number(tournament["@usdPrizepool"])),
      weekDay = tournament["@getWeekday"],

      BidEqual = BidEqualQ(bid),
      BidFrom = BidFromQ(bid),
      BidTo = BidToQ(bid);
      PrizepoolEqualQ(prizepool);
      PrizepoolFromQ(prizepool);
      PrizepoolToQ(prizepool);
      EntrantsEqualQ(tournament?.["@totalEntrants"] ?? 0);
      EntrantsFromQ(tournament?.["@totalEntrants"] ?? 0);
      EntrantsToQ(tournament?.["@totalEntrants"] ?? 0);
      AbilityEqualQ(ability);
      AbilityFromQ(ability);
      AbilityToQ(ability);
      StartRegEqualQ(tournament["@msStartForRule"]);
      StartRegFromQ(tournament["@msStartForRule"]);
      StartRegToQ(tournament["@msStartForRule"]);
      LateRegEqualQ(tournament["@msLateForRule"]);
      LateRegFromQ(tournament["@msLateForRule"]);
      LateRegToQ(tournament["@msLateForRule"]);
      TicketEqualQ(tournament?.["@tickets"] ?? 0);
      TicketFromQ(tournament?.["@tickets"] ?? 0);
      TicketToQ(tournament?.["@tickets"] ?? 0);
      StartDayQ(weekDay);
      const Name = NameQ(name);
      NotNameQ(name);
      const Flags = FlagsQ(tournament),
      Class = ClassQ(tournament),
      Structure = StructureQ(tournament),
      Game = GameQ(tournament);
    const isTurbo = isTurboS(tournament);
    const isSuperTurbo = isSuperTurboS(tournament);
    const isKo = isNormalS(tournament);
    const isNormal = !isTurbo && !isSuperTurbo;

    const level = validateNumber(ruleLevel);
    const effmu = 'A';
  
    if (!name || !bid) {
      return { valid: false, guarantee: 1, rules: false };
    }

    if((BidFrom(0))&& effmu === 'A'&& isSuperTurbo) {
    return { valid: false, guarantee: 1, rules: false };
  }if((Flags("sat"))&& effmu === 'A') {
    return { valid: false, guarantee: 1, rules: false };
  }if((Flags("od"))&& effmu === 'A') {
    return { valid: false, guarantee: 1, rules: false };
  }if((Structure("!NL"))&& effmu === 'A') {
    return { valid: false, guarantee: 1, rules: false };
  }if((Game("!H"))&& effmu === 'A') {
    return { valid: false, guarantee: 1, rules: false };
  }if((Class("!scheduled"))&& effmu === 'A') {
    return { valid: false, guarantee: 1, rules: false };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(3.3))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(11))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(4.4))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(4.4))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4.4))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(16.5))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(5.5))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5.5))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5.5))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(7.5))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5.5))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(11))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(44))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(11))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(11))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'GGNetwork'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'GGNetwork'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(21))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(31))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'GGNetwork'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'GGNetwork'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(7))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'Winamax.fr'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'Winamax.fr'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5))&& network === 'Winamax.fr'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === '888Poker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(11))&& network === '888Poker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(11))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === '888Poker'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5))&& network === '888Poker'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(11))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(11))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(16))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(11))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(7))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(15))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'iPoker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'iPoker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'iPoker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'iPoker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'iPoker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'iPoker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'iPoker'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'iPoker'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(1))&& network === 'iPoker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'iPoker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2))&& network === 'iPoker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'iPoker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(7))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(4))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(16.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(16.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(7))&& network === 'GGNetwork'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(54))&& network === 'GGNetwork'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'GGNetwork'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12.6))&& network === 'GGNetwork'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(7))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(50))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(2.5))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(4))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(7))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(22))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(7))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(7))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(4))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(22))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(8))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(60))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(3))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12.6))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(6))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(33))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(7.5))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(7))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(4))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(15))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(108))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(21))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(14))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(100))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(15))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(22))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isTurbo&& !isKo && (BidTo(22))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isTurbo&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(15))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(15))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(109))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(6))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(33))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(15))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(21))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(15))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(11))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(162))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(8))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(20))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(150))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(20))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(31))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(25))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(200))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(7))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(50))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(30))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(215))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(8))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(33))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(15))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(12))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(15))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(109))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(15))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(12))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(31))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(25))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(22))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(215))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(15))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(5))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(20))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(150))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(15))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(10))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(54))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(20))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(200))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(10))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(50))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(10))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(50))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(22))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(215))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(22))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(10))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(22))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(215))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(25))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(22))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(215))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(22))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(160))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(25))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidFrom(10))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidEqual(1))&& network === 'Chico'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidEqual(1))&& network === 'PokerStars(FR-ES-PT)'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }if((BidEqual(1))&& network === 'PartyPoker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1 };
  }
    
    return { valid: false, guarantee: 1, rules: false };
  };
  
  var filter_1 = {
    filter,
  };

module.exports = filter_1;
