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
      const PrizepoolFrom = PrizepoolFromQ(prizepool);
      PrizepoolToQ(prizepool);
      EntrantsEqualQ(tournament?.["@totalEntrants"] ?? 0);
      EntrantsFromQ(tournament?.["@totalEntrants"] ?? 0);
      EntrantsToQ(tournament?.["@totalEntrants"] ?? 0);
      AbilityEqualQ(ability);
      AbilityFromQ(ability);
      AbilityToQ(ability);
      StartRegEqualQ(tournament["@msStartForRule"]);
      const StartRegFrom = StartRegFromQ(tournament["@msStartForRule"]),
      StartRegTo = StartRegToQ(tournament["@msStartForRule"]);
      LateRegEqualQ(tournament["@msLateForRule"]);
      LateRegFromQ(tournament["@msLateForRule"]);
      LateRegToQ(tournament["@msLateForRule"]);
      TicketEqualQ(tournament?.["@tickets"] ?? 0);
      TicketFromQ(tournament?.["@tickets"] ?? 0);
      TicketToQ(tournament?.["@tickets"] ?? 0);
      const StartDay = StartDayQ(weekDay),
      Name = NameQ(name);
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
  }if((Name("speed racer"))&& network === 'GGNetwork'&& effmu === 'A') {
    return { valid: false, guarantee: 1, rules: false };
  }if((Name("zoom"))&& network === 'PokerStars'&& effmu === 'A'&& isNormal) {
    return { valid: false, guarantee: 1, rules: false };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(3.3))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["3.3"],"color":"blue","level":"1A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"Name","values":["hot"],"color":"blue","level":"1A","network":"PokerStars","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(11))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["11"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["builder"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(4.4))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["4.4"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(4.4))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["4.4"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"Name","values":["big"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4.4))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4.4"],"color":"blue","level":"2A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"Name","values":["hot"],"color":"blue","level":"2A","network":"PokerStars","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(16.5))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["16.5"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["builder"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(5.5))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["5.5"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5.5))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["5.5"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"Name","values":["big"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5.5))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["5.5"],"color":"blue","level":"3A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"Name","values":["hot"],"color":"blue","level":"3A","network":"PokerStars","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["builder"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(7.5))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["7.5"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5.5))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["5.5"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"Name","values":["big"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(3))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(11))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["11"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"Name","values":["big"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(3))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(44))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["44"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["builder"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(11))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["11"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(11))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["11"],"color":"blue","level":"4A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"Name","values":["hot"],"color":"blue","level":"4A","network":"PokerStars","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'GGNetwork'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'GGNetwork'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"1A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"2A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(21))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["21"],"color":"blue","level":"3A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(31))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["31"],"color":"blue","level":"4A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'GGNetwork'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'GGNetwork'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"GGNetwork","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"1A","network":"GGNetwork","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"GGNetwork","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"2A","network":"GGNetwork","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"GGNetwork","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"3A","network":"GGNetwork","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(7))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"GGNetwork","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["7"],"color":"blue","level":"4A","network":"GGNetwork","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'Winamax.fr'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["10"],"color":"blue","level":"1A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["20"],"color":"blue","level":"2A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["20"],"color":"blue","level":"3A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["20"],"color":"blue","level":"4A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'Winamax.fr'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5))&& network === 'Winamax.fr'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["5"],"color":"blue","level":"1A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(1))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["10"],"color":"blue","level":"2A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(2))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["10"],"color":"blue","level":"3A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(3))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["10"],"color":"blue","level":"4A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(1))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5))&& network === 'Winamax.fr'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["5"],"color":"blue","level":"2A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["5"],"color":"blue","level":"3A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["10"],"color":"blue","level":"4A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === '888Poker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(11))&& network === '888Poker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"888Poker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["11"],"color":"blue","level":"1A","network":"888Poker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(11))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"888Poker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["11"],"color":"blue","level":"2A","network":"888Poker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"888Poker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"3A","network":"888Poker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"888Poker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"4A","network":"888Poker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === '888Poker'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5))&& network === '888Poker'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"888Poker","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["5"],"color":"blue","level":"1A","network":"888Poker","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(1))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(11))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"888Poker","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["11"],"color":"blue","level":"2A","network":"888Poker","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(2))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(11))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"888Poker","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["11"],"color":"blue","level":"3A","network":"888Poker","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(3))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(16))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"888Poker","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["16"],"color":"blue","level":"4A","network":"888Poker","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(1))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5))&& network === '888Poker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"888Poker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["5"],"color":"blue","level":"2A","network":"888Poker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(5))&& network === '888Poker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"888Poker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["5"],"color":"blue","level":"3A","network":"888Poker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(11))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"888Poker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["11"],"color":"blue","level":"4A","network":"888Poker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"WPN","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"1A","network":"WPN","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"WPN","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"2A","network":"WPN","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"WPN","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"3A","network":"WPN","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"WPN","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["33"],"color":"blue","level":"4A","network":"WPN","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(5))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"WPN","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["5"],"color":"blue","level":"1A","network":"WPN","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(1))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(7))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"WPN","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["7"],"color":"blue","level":"2A","network":"WPN","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(2))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"WPN","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["10"],"color":"blue","level":"3A","network":"WPN","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(3))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(15))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"WPN","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["15"],"color":"blue","level":"4A","network":"WPN","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(5.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5.5"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["55"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["builder"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'iPoker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'iPoker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"1A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'iPoker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'iPoker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"2A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'iPoker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'iPoker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"3A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["33"],"color":"blue","level":"4A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'iPoker'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'iPoker'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"iPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"1A","network":"iPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'iPoker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'iPoker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"iPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"2A","network":"iPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'iPoker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'iPoker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"iPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"3A","network":"iPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(7))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"iPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["7"],"color":"blue","level":"4A","network":"iPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(4))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(16.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["4"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["16.5"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"Name","values":["big"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(5.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5.5"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["33"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["ko"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(5.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(16.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5.5"],"color":"blue","level":"5A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["16.5"],"color":"blue","level":"5A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"Name","values":["hot"],"color":"blue","level":"5A","network":"PokerStars","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(7))&& network === 'GGNetwork'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(54))&& network === 'GGNetwork'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["7"],"color":"blue","level":"5A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["54"],"color":"blue","level":"5A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'GGNetwork'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12.6))&& network === 'GGNetwork'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"5A","network":"GGNetwork","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["12.6"],"color":"blue","level":"5A","network":"GGNetwork","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(7))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(50))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["7"],"color":"blue","level":"5A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["50"],"color":"blue","level":"5A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2.5))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(10))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2.5"],"color":"blue","level":"5A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["10"],"color":"blue","level":"5A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(4))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["4"],"color":"blue","level":"5A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["20"],"color":"blue","level":"5A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(7))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["7"],"color":"blue","level":"5A","network":"888Poker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["55"],"color":"blue","level":"5A","network":"888Poker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(5))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(22))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"5A","network":"888Poker","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["22"],"color":"blue","level":"5A","network":"888Poker","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(5))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === '888Poker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"5A","network":"888Poker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"5A","network":"888Poker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(7))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["7"],"color":"blue","level":"5A","network":"WPN","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["55"],"color":"blue","level":"5A","network":"WPN","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(7))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["7"],"color":"blue","level":"5A","network":"WPN","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["55"],"color":"blue","level":"5A","network":"WPN","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(4))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(22))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["4"],"color":"blue","level":"5A","network":"WPN","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["22"],"color":"blue","level":"5A","network":"WPN","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(8))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(60))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["8"],"color":"blue","level":"5A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["60"],"color":"blue","level":"5A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12.6))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"5A","network":"iPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["12.6"],"color":"blue","level":"5A","network":"iPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(6))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(33))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["6"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["33"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"Name","values":["big"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(7.5))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["7.5"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["builder"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(7))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["7"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["55"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["ko"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(4))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["4"],"color":"blue","level":"6A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"6A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"Name","values":["hot"],"color":"blue","level":"6A","network":"PokerStars","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(108))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"6A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["108"],"color":"blue","level":"6A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(5))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(21))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"6A","network":"GGNetwork","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["21"],"color":"blue","level":"6A","network":"GGNetwork","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(14))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(100))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["14"],"color":"blue","level":"6A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["100"],"color":"blue","level":"6A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(5))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"6A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["20"],"color":"blue","level":"6A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(5))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"6A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["20"],"color":"blue","level":"6A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"6A","network":"888Poker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"6A","network":"888Poker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(5))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(22))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"6A","network":"888Poker","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["22"],"color":"blue","level":"6A","network":"888Poker","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(5))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isTurbo&& !isKo && (BidTo(22))&& network === '888Poker'&& level === '6'&& effmu === 'A'&& isTurbo&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"6A","network":"888Poker","status":"Turbo","KO":"Freeze-out"},{"type":"BidTo","values":["22"],"color":"blue","level":"6A","network":"888Poker","status":"Turbo","KO":"Freeze-out"}] };
  }if((BidFrom(15))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"6A","network":"WPN","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"6A","network":"WPN","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(109))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"6A","network":"WPN","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"6A","network":"WPN","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(6))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(33))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["6"],"color":"blue","level":"6A","network":"WPN","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["33"],"color":"blue","level":"6A","network":"WPN","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(15))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"6A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"6A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(5))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(21))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"6A","network":"iPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["21"],"color":"blue","level":"6A","network":"iPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["109"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"Name","values":["big"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(5))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"7A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"7A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"Name","values":["hot"],"color":"blue","level":"7A","network":"PokerStars","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(11))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(162))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["11"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["162"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["builder"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(8))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(55))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["8"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["55"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["ko"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(20))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(150))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["20"],"color":"blue","level":"7A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["150"],"color":"blue","level":"7A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(20))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["20"],"color":"blue","level":"7A","network":"GGNetwork","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["55"],"color":"blue","level":"7A","network":"GGNetwork","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(5))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(31))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"7A","network":"GGNetwork","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["31"],"color":"blue","level":"7A","network":"GGNetwork","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(25))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(200))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["25"],"color":"blue","level":"7A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["200"],"color":"blue","level":"7A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(5))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(20))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"7A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["20"],"color":"blue","level":"7A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(7))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(50))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["7"],"color":"blue","level":"7A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["50"],"color":"blue","level":"7A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(30))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(215))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["30"],"color":"blue","level":"7A","network":"888Poker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["215"],"color":"blue","level":"7A","network":"888Poker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(8))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(33))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["8"],"color":"blue","level":"7A","network":"888Poker","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["33"],"color":"blue","level":"7A","network":"888Poker","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(5))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === '888Poker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"7A","network":"888Poker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"7A","network":"888Poker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"7A","network":"WPN","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"7A","network":"WPN","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(12))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["12"],"color":"blue","level":"7A","network":"WPN","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["55"],"color":"blue","level":"7A","network":"WPN","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(15))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"7A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"7A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(12))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["12"],"color":"blue","level":"7A","network":"iPoker","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["55"],"color":"blue","level":"7A","network":"iPoker","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(5))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(31))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"7A","network":"iPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["31"],"color":"blue","level":"7A","network":"iPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(25))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (Name("big"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["25"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["109"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"Freeze-out"},{"type":"Name","values":["big"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(22))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(215))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["22"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["215"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["builder"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["ko"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(5))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (Name("hot"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"8A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"8A","network":"PokerStars","status":"Turbo","KO":"Knockout"},{"type":"Name","values":["hot"],"color":"blue","level":"8A","network":"PokerStars","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(20))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(150))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["20"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["150"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["55"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(10))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(54))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["10"],"color":"blue","level":"8A","network":"GGNetwork","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["54"],"color":"blue","level":"8A","network":"GGNetwork","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(20))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(200))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["20"],"color":"blue","level":"8A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["200"],"color":"blue","level":"8A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(10))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(50))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["10"],"color":"blue","level":"8A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["50"],"color":"blue","level":"8A","network":"Winamax.fr","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(10))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(50))&& network === 'Winamax.fr'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["10"],"color":"blue","level":"8A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["50"],"color":"blue","level":"8A","network":"Winamax.fr","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(22))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(215))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["22"],"color":"blue","level":"8A","network":"888Poker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["215"],"color":"blue","level":"8A","network":"888Poker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(22))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["22"],"color":"blue","level":"8A","network":"888Poker","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["55"],"color":"blue","level":"8A","network":"888Poker","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(10))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["10"],"color":"blue","level":"8A","network":"888Poker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["55"],"color":"blue","level":"8A","network":"888Poker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(22))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(215))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["22"],"color":"blue","level":"8A","network":"WPN","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["215"],"color":"blue","level":"8A","network":"WPN","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(25))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["25"],"color":"blue","level":"8A","network":"WPN","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["109"],"color":"blue","level":"8A","network":"WPN","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(22))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(215))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["22"],"color":"blue","level":"8A","network":"WPN","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["215"],"color":"blue","level":"8A","network":"WPN","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(22))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(160))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["22"],"color":"blue","level":"8A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["160"],"color":"blue","level":"8A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(25))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["25"],"color":"blue","level":"8A","network":"iPoker","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["109"],"color":"blue","level":"8A","network":"iPoker","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(10))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["10"],"color":"blue","level":"8A","network":"iPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["55"],"color":"blue","level":"8A","network":"iPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'Chico'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'Chico'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"1A","network":"Chico","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'Chico'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'Chico'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"2A","network":"Chico","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'Chico'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'Chico'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"3A","network":"Chico","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'Chico'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'Chico'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["33"],"color":"blue","level":"4A","network":"Chico","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'Chico'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'Chico'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"Chico","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"1A","network":"Chico","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'Chico'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'Chico'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"Chico","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"2A","network":"Chico","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'Chico'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'Chico'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"Chico","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"3A","network":"Chico","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'Chico'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(7))&& network === 'Chico'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"Chico","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["7"],"color":"blue","level":"4A","network":"Chico","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(8))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(60))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["8"],"color":"blue","level":"5A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["60"],"color":"blue","level":"5A","network":"Chico","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12.6))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"5A","network":"Chico","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["12.6"],"color":"blue","level":"5A","network":"Chico","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"6A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"6A","network":"Chico","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(5))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(21))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"6A","network":"Chico","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["21"],"color":"blue","level":"6A","network":"Chico","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"7A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"7A","network":"Chico","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(12))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["12"],"color":"blue","level":"7A","network":"Chico","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["55"],"color":"blue","level":"7A","network":"Chico","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(5))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(31))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"7A","network":"Chico","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["31"],"color":"blue","level":"7A","network":"Chico","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(22))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(160))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["22"],"color":"blue","level":"8A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["160"],"color":"blue","level":"8A","network":"Chico","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(25))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["25"],"color":"blue","level":"8A","network":"Chico","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["109"],"color":"blue","level":"8A","network":"Chico","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(10))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["10"],"color":"blue","level":"8A","network":"Chico","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["55"],"color":"blue","level":"8A","network":"Chico","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PokerStars(FR-ES-PT)'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'PokerStars(FR-ES-PT)'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"1A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PokerStars(FR-ES-PT)'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'PokerStars(FR-ES-PT)'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"2A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'PokerStars(FR-ES-PT)'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'PokerStars(FR-ES-PT)'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"3A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'PokerStars(FR-ES-PT)'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'PokerStars(FR-ES-PT)'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["33"],"color":"blue","level":"4A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PokerStars(FR-ES-PT)'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'PokerStars(FR-ES-PT)'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"1A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PokerStars(FR-ES-PT)'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'PokerStars(FR-ES-PT)'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"2A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'PokerStars(FR-ES-PT)'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'PokerStars(FR-ES-PT)'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"3A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'PokerStars(FR-ES-PT)'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(7))&& network === 'PokerStars(FR-ES-PT)'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["7"],"color":"blue","level":"4A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(8))&& network === 'PokerStars(FR-ES-PT)'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(60))&& network === 'PokerStars(FR-ES-PT)'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["8"],"color":"blue","level":"5A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["60"],"color":"blue","level":"5A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'PokerStars(FR-ES-PT)'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12.6))&& network === 'PokerStars(FR-ES-PT)'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"5A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["12.6"],"color":"blue","level":"5A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === 'PokerStars(FR-ES-PT)'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PokerStars(FR-ES-PT)'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"6A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"6A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(5))&& network === 'PokerStars(FR-ES-PT)'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(21))&& network === 'PokerStars(FR-ES-PT)'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"6A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["21"],"color":"blue","level":"6A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === 'PokerStars(FR-ES-PT)'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PokerStars(FR-ES-PT)'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"7A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"7A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(12))&& network === 'PokerStars(FR-ES-PT)'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'PokerStars(FR-ES-PT)'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["12"],"color":"blue","level":"7A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["55"],"color":"blue","level":"7A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(5))&& network === 'PokerStars(FR-ES-PT)'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(31))&& network === 'PokerStars(FR-ES-PT)'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"7A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["31"],"color":"blue","level":"7A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(22))&& network === 'PokerStars(FR-ES-PT)'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(160))&& network === 'PokerStars(FR-ES-PT)'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["22"],"color":"blue","level":"8A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["160"],"color":"blue","level":"8A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(25))&& network === 'PokerStars(FR-ES-PT)'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'PokerStars(FR-ES-PT)'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["25"],"color":"blue","level":"8A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["109"],"color":"blue","level":"8A","network":"PokerStars(FR-ES-PT)","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(10))&& network === 'PokerStars(FR-ES-PT)'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'PokerStars(FR-ES-PT)'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["10"],"color":"blue","level":"8A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["55"],"color":"blue","level":"8A","network":"PokerStars(FR-ES-PT)","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PartyPoker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'PartyPoker'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"PartyPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"1A","network":"PartyPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PartyPoker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidTo(12))&& network === 'PartyPoker'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"PartyPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"2A","network":"PartyPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'PartyPoker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(22))&& network === 'PartyPoker'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"PartyPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"3A","network":"PartyPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'PartyPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'PartyPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"PartyPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["33"],"color":"blue","level":"4A","network":"PartyPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PartyPoker'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'PartyPoker'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"1A","network":"PartyPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"1A","network":"PartyPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(1))&& network === 'PartyPoker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'PartyPoker'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["1"],"color":"blue","level":"2A","network":"PartyPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"2A","network":"PartyPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'PartyPoker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(4))&& network === 'PartyPoker'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"3A","network":"PartyPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["4"],"color":"blue","level":"3A","network":"PartyPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'PartyPoker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(7))&& network === 'PartyPoker'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"4A","network":"PartyPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["7"],"color":"blue","level":"4A","network":"PartyPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(8))&& network === 'PartyPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(60))&& network === 'PartyPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["8"],"color":"blue","level":"5A","network":"PartyPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["60"],"color":"blue","level":"5A","network":"PartyPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(3))&& network === 'PartyPoker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12.6))&& network === 'PartyPoker'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["3"],"color":"blue","level":"5A","network":"PartyPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["12.6"],"color":"blue","level":"5A","network":"PartyPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === 'PartyPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PartyPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"6A","network":"PartyPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"6A","network":"PartyPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(5))&& network === 'PartyPoker'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(21))&& network === 'PartyPoker'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"6A","network":"PartyPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["21"],"color":"blue","level":"6A","network":"PartyPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(15))&& network === 'PartyPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PartyPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["15"],"color":"blue","level":"7A","network":"PartyPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"7A","network":"PartyPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(12))&& network === 'PartyPoker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(55))&& network === 'PartyPoker'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["12"],"color":"blue","level":"7A","network":"PartyPoker","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["55"],"color":"blue","level":"7A","network":"PartyPoker","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(5))&& network === 'PartyPoker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(31))&& network === 'PartyPoker'&& level === '7'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"7A","network":"PartyPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["31"],"color":"blue","level":"7A","network":"PartyPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(22))&& network === 'PartyPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (BidTo(160))&& network === 'PartyPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["22"],"color":"blue","level":"8A","network":"PartyPoker","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["160"],"color":"blue","level":"8A","network":"PartyPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(25))&& network === 'PartyPoker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (BidTo(109))&& network === 'PartyPoker'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["25"],"color":"blue","level":"8A","network":"PartyPoker","status":"Normal","KO":"Freeze-out"},{"type":"BidTo","values":["109"],"color":"blue","level":"8A","network":"PartyPoker","status":"Normal","KO":"Freeze-out"}] };
  }if((BidFrom(10))&& network === 'PartyPoker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'PartyPoker'&& level === '8'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["10"],"color":"blue","level":"8A","network":"PartyPoker","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["55"],"color":"blue","level":"8A","network":"PartyPoker","status":"Turbo","KO":"Knockout"}] };
  }if((BidEqual(16.5))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Friday"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["16.5"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["builder"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Friday"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(16.5))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (Name("builder"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Saturday"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["16.5"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["builder"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Saturday"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(11))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo && (Name("storm"))&& network === 'PokerStars'&& level === '1'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["11"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["storm"],"color":"blue","level":"1A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(11))&& network === 'PokerStars'&& effmu === 'A'&& isNormal && (Name("storm"))&& network === 'PokerStars'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["11"],"color":"blue","level":"-1A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"Name","values":["storm"],"color":"blue","level":"-1A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((BidEqual(22))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal && (StartDay("Friday"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["22"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"Name","values":["builder"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartDay","values":["Friday"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((BidEqual(22))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal && (StartDay("Saturday"))&& network === 'PokerStars'&& level === '2'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["22"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"Name","values":["builder"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartDay","values":["Saturday"],"color":"blue","level":"2A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((BidEqual(33))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal && (StartDay("Friday"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["33"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"Name","values":["builder"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartDay","values":["Friday"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((BidEqual(33))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal && (StartDay("Saturday"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["33"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"Name","values":["builder"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartDay","values":["Saturday"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((BidEqual(55))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal && (StartDay("Friday"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["55"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"Name","values":["builder"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartDay","values":["Friday"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((BidEqual(55))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal && (StartDay("Saturday"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["55"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"Name","values":["builder"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartDay","values":["Saturday"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((BidEqual(82))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal && (Name("builder"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal && (StartDay("Friday"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal && (StartRegFrom(18000000))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal && (StartRegTo(50400000))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["82"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"Name","values":["builder"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartDay","values":["Friday"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartRegFrom","values":["05:00"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartRegTo","values":["14:00"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((Name("builder"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (BidEqual(162))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (StartRegFrom(79200000))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (StartRegTo(18000000))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (StartDay("Friday"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["builder"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"BidEqual","values":["162"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartRegFrom","values":["22:00"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartRegTo","values":["05:00"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartDay","values":["Friday"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((Name("builder"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (BidEqual(162))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (StartRegFrom(79200000))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (StartRegTo(18000000))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal && (StartDay("Saturday"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["builder"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"BidEqual","values":["162"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartRegFrom","values":["22:00"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartRegTo","values":["05:00"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartDay","values":["Saturday"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((Name("cooldown"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal && (BidEqual(109))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["cooldown"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"BidEqual","values":["109"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((Name("builder"))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal && (BidEqual(215))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal && (StartRegFrom(18000000))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal && (StartRegTo(50400000))&& network === 'PokerStars'&& level === '7'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["builder"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"BidEqual","values":["215"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartRegFrom","values":["05:00"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"StartRegTo","values":["14:00"],"color":"blue","level":"7A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((Name("cooldown"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal && (BidEqual(109))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["cooldown"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"BidEqual","values":["109"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((Name("marathon"))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal && (BidEqual(55))&& network === 'PokerStars'&& level === '8'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["marathon"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"all"},{"type":"BidEqual","values":["55"],"color":"blue","level":"8A","network":"PokerStars","status":"Normal","KO":"all"}] };
  }if((Name("masters"))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(25))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'GGNetwork'&& level === '2'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["masters"],"color":"blue","level":"2A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidEqual","values":["25"],"color":"blue","level":"2A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"2A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((Name("masters"))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(25))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["masters"],"color":"blue","level":"3A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidEqual","values":["25"],"color":"blue","level":"3A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"3A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((Name("main"))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(52.5))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'GGNetwork'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["main"],"color":"blue","level":"3A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidEqual","values":["52.5"],"color":"blue","level":"3A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"3A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((Name("masters"))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(150))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["masters"],"color":"blue","level":"6A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidEqual","values":["150"],"color":"blue","level":"6A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((Name("main"))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(388))&& network === 'GGNetwork'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["main"],"color":"blue","level":"6A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidEqual","values":["388"],"color":"blue","level":"6A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((Name("masters"))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(150))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["masters"],"color":"blue","level":"7A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"BidEqual","values":["150"],"color":"blue","level":"7A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(210))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartRegFrom(39600000))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartRegTo(61200000))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["210"],"color":"blue","level":"7A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"StartRegFrom","values":["11:00"],"color":"blue","level":"7A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"StartRegTo","values":["17:00"],"color":"blue","level":"7A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(388))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'GGNetwork'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["388"],"color":"blue","level":"7A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"Name","values":["main"],"color":"blue","level":"7A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(150))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("masters"))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["150"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"Name","values":["masters"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(210))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (StartRegFrom(39600000))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (StartRegTo(61200000))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["210"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"StartRegFrom","values":["11:00"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"StartRegTo","values":["17:00"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(525))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["525"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(388))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'GGNetwork'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["388"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"Name","values":["main"],"color":"blue","level":"8A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(25))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (Name("half price"))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'Winamax.fr'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["25"],"color":"blue","level":"3A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"Name","values":["half price"],"color":"blue","level":"3A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"3A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(25))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("half price"))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'Winamax.fr'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["25"],"color":"blue","level":"4A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"Name","values":["half price"],"color":"blue","level":"4A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"4A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(125))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["125"],"color":"blue","level":"5A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"Name","values":["main"],"color":"blue","level":"5A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(50))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("monstr"))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (StartRegFrom(79200000))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (StartRegTo(21600000))&& network === 'Winamax.fr'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["50"],"color":"blue","level":"5A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"Name","values":["monstr"],"color":"blue","level":"5A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"StartRegFrom","values":["22:00"],"color":"blue","level":"5A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"StartRegTo","values":["06:00"],"color":"blue","level":"5A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(50))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("monstr"))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (StartRegFrom(79200000))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (StartRegTo(21600000))&& network === 'Winamax.fr'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["50"],"color":"blue","level":"6A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"Name","values":["monstr"],"color":"blue","level":"6A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"StartRegFrom","values":["22:00"],"color":"blue","level":"6A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"StartRegTo","values":["06:00"],"color":"blue","level":"6A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(50))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("monstr"))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartRegFrom(79200000))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartRegTo(21600000))&& network === 'Winamax.fr'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["50"],"color":"blue","level":"7A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"Name","values":["monstr"],"color":"blue","level":"7A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"StartRegFrom","values":["22:00"],"color":"blue","level":"7A","network":"Winamax.fr","status":"Normal","KO":"Knockout"},{"type":"StartRegTo","values":["06:00"],"color":"blue","level":"7A","network":"Winamax.fr","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(33))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("rumble"))&& network === '888Poker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["33"],"color":"blue","level":"4A","network":"888Poker","status":"Normal","KO":"Knockout"},{"type":"Name","values":["rumble"],"color":"blue","level":"4A","network":"888Poker","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(109))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal && (Name("bigshot"))&& network === '888Poker'&& level === '8'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["109"],"color":"blue","level":"8A","network":"888Poker","status":"Normal","KO":"all"},{"type":"Name","values":["bigshot"],"color":"blue","level":"8A","network":"888Poker","status":"Normal","KO":"all"}] };
  }if((BidEqual(55))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal && (StartDay("Sunday"))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isNormal) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["55"],"color":"blue","level":"6A","network":"WPN","status":"Normal","KO":"all"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"6A","network":"WPN","status":"Normal","KO":"all"}] };
  }if((BidEqual(109))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo && (PrizepoolFrom(300000))&& network === 'WPN'&& level === '7'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["109"],"color":"blue","level":"7A","network":"WPN","status":"Normal","KO":"Freeze-out"},{"type":"PrizepoolFrom","values":["300000"],"color":"blue","level":"7A","network":"WPN","status":"Normal","KO":"Freeze-out"}] };
  }if((BidEqual(215))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo && (PrizepoolFrom(400000))&& network === 'WPN'&& level === '8'&& effmu === 'A'&& isNormal&& !isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["215"],"color":"blue","level":"8A","network":"WPN","status":"Normal","KO":"Freeze-out"},{"type":"PrizepoolFrom","values":["400000"],"color":"blue","level":"8A","network":"WPN","status":"Normal","KO":"Freeze-out"}] };
  }if((BidEqual(50))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("daily main"))&& network === 'iPoker'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["50"],"color":"blue","level":"4A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"Name","values":["daily main"],"color":"blue","level":"4A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(100))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'iPoker'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["100"],"color":"blue","level":"5A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"Name","values":["main"],"color":"blue","level":"5A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"5A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(100))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'iPoker'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["100"],"color":"blue","level":"6A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"Name","values":["main"],"color":"blue","level":"6A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"6A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(100))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["100"],"color":"blue","level":"7A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"Name","values":["main"],"color":"blue","level":"7A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"7A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((Name("slam ko"))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'iPoker'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["slam ko"],"color":"blue","level":"7A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"7A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((Name("100"))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'iPoker'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["100"],"color":"blue","level":"8A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"8A","network":"iPoker","status":"Normal","KO":"Knockout"},{"type":"Name","values":["main"],"color":"blue","level":"8A","network":"iPoker","status":"Normal","KO":"Knockout"}] };
  }if((Name("main"))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidEqual(109))&& network === 'Chico'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"Name","values":["main"],"color":"blue","level":"5A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"5A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"BidEqual","values":["109"],"color":"blue","level":"5A","network":"Chico","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(109))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'Chico'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["109"],"color":"blue","level":"6A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"Name","values":["main"],"color":"blue","level":"6A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"6A","network":"Chico","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(109))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'Chico'&& level === '7'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["109"],"color":"blue","level":"7A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"Name","values":["main"],"color":"blue","level":"7A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"7A","network":"Chico","status":"Normal","KO":"Knockout"}] };
  }if((BidEqual(109))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'Chico'&& level === '8'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["109"],"color":"blue","level":"8A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"Name","values":["main"],"color":"blue","level":"8A","network":"Chico","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"8A","network":"Chico","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2.2))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (BidTo(27))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '3'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2.2"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["27"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["ko"],"color":"blue","level":"3A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(2.2))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (BidTo(27))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2.2"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["27"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["ko"],"color":"blue","level":"4A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(5.5))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (Name("ko"))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo && (BidTo(33))&& network === 'PokerStars'&& level === '5'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5.5"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["ko"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["33"],"color":"blue","level":"5A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(7.5))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (Name("progressive ko"))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo && (BidTo(109))&& network === 'PokerStars'&& level === '6'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["7.5"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"Name","values":["progressive ko"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"6A","network":"PokerStars","status":"Normal","KO":"Knockout"}] };
  }if((BidFrom(4))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(22))&& network === 'WPN'&& level === '3'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["4"],"color":"blue","level":"3A","network":"WPN","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["22"],"color":"blue","level":"3A","network":"WPN","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12))&& network === 'WPN'&& level === '2'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"2A","network":"WPN","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"2A","network":"WPN","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(2))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(12))&& network === 'WPN'&& level === '1'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["2"],"color":"blue","level":"1A","network":"WPN","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["12"],"color":"blue","level":"1A","network":"WPN","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(5))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(33))&& network === 'WPN'&& level === '4'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["5"],"color":"blue","level":"4A","network":"WPN","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["33"],"color":"blue","level":"4A","network":"WPN","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(6))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(55))&& network === 'WPN'&& level === '5'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["6"],"color":"blue","level":"5A","network":"WPN","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["55"],"color":"blue","level":"5A","network":"WPN","status":"Turbo","KO":"Knockout"}] };
  }if((BidFrom(10))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo && (BidTo(109))&& network === 'WPN'&& level === '6'&& effmu === 'A'&& isTurbo&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidFrom","values":["10"],"color":"blue","level":"6A","network":"WPN","status":"Turbo","KO":"Knockout"},{"type":"BidTo","values":["109"],"color":"blue","level":"6A","network":"WPN","status":"Turbo","KO":"Knockout"}] };
  }if((BidEqual(52.5))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (StartDay("Sunday"))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isNormal&& isKo && (Name("main"))&& network === 'GGNetwork'&& level === '4'&& effmu === 'A'&& isNormal&& isKo) {
    return { valid: true, rules: true, guarantee: 1, rules: [{"type":"BidEqual","values":["52.5"],"color":"blue","level":"4A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"StartDay","values":["Sunday"],"color":"blue","level":"4A","network":"GGNetwork","status":"Normal","KO":"Knockout"},{"type":"Name","values":["main"],"color":"blue","level":"4A","network":"GGNetwork","status":"Normal","KO":"Knockout"}] };
  }
    
    return { valid: false, guarantee: 1, rules: false };
  };
  
  var filter_1 = {
    filter,
  };

module.exports = filter_1;
