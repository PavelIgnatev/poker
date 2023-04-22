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

    const name = tournament["@name"]?.toLowerCase();
      getNetwork(tournament["@network"]);
      const bid = Number(tournament["@usdBid"]),
      prizepool = Math.round(Number(tournament["@usdPrizepool"])),
      weekDay = tournament["@getWeekday"];

      BidEqualQ(bid);
      BidFromQ(bid);
      BidToQ(bid);
      PrizepoolEqualQ(prizepool);
      PrizepoolFromQ(prizepool);
      PrizepoolToQ(prizepool);
      EntrantsEqualQ(tournament?.["@totalEntrants"] ?? 0);
      const EntrantsFrom = EntrantsFromQ(tournament?.["@totalEntrants"] ?? 0);
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
      NameQ(name);
      NotNameQ(name);
      FlagsQ(tournament);
      ClassQ(tournament);
      StructureQ(tournament);
      GameQ(tournament);
    isTurboS(tournament);
    isSuperTurboS(tournament);
    isNormalS(tournament);

    validateNumber(ruleLevel);
    const effmu = 'A';
  
    if (!name || !bid) return { valid: false, guarantee: 1, rules: false };

    if((EntrantsFrom(1))&& effmu === 'A') return { valid: true, rules: true, guarantee: 1 };
    
    return { valid: false, guarantee: 1, rules: false };
  };
  
  var filter_1 = {
    filter,
  };

module.exports = filter_1;
