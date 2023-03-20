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

// FromTo = FromToQ(bid);
// FromToName = FromToNameQ(name)(bid);
// BidGt = BidGtQ(bid)(prizepool);
// BidGtName = BidGtNameQ(name)(bid)(prizepool);
// FromToGt = FromToGtQ(bid)(prizepool);
// Entrants = EntrantsQ(tournament?.["@totalEntrants"] ?? 0);
// BidName = BidNameQ(name)(bid);
// StartDay = StartDayQ(weekDay);
// Name = NameQ(name);
// NotName = NotNameQ(name);
// FLAGS = FLAGSQ(tournament);

//Ставка больше либо равно и ставка меньше либо равно
const FromTo = curry(
  (realBid, from, to) => Number(realBid) >= Number(from) && Number(realBid) <= Number(to),
);

//name.includes
const Name = curry((name, str) => name.toLowerCase().includes(str.toLowerCase()));

//Ставка больше либо равно и ставка меньше либо равно + name.includes
const FromToName = curry(
  (name, realBid, from, to, str) => FromTo(realBid, from, to) && Name(name, str),
);

//Ставка равно, гарантия больше либо равно
const BidGt = curry(
  (realBid, realPrizepool, bid, prizepool) =>
    Number(bid) === Number(realBid) && Number(realPrizepool) >= Number(prizepool),
);

//Ставка равно, гарантия больше либо равно + name.includes
const BidGtName = curry(
  (name, realBid, realPrizepool, bid, prizepool, str) =>
    BidGt(realBid, realPrizepool, bid, prizepool) && Name(name, str),
);

//Ставка равно + name.includes
const BidName = curry(
  (name, realBid, bid, str) => Number(realBid) === Number(bid) && Name(name, str),
);

//!name.includes
const NotName = curry((name, str) => !Name(name, str));

//Ставка больше либо равно и ставка меньше либо равно, гарантия больше либо равно
const FromToGt = curry(
  (realBid, realPrizepool, from, to, prizepool) =>
    FromTo(realBid, from, to) && Number(realPrizepool) >= Number(prizepool),
);

//Ставка больше либо равно и ставка меньше либо равно, гарантия больше либо равно
const StartDay = curry((realDay, day) => String(realDay) === String(day));

// Фильтр по флагу
const FLAGS = curry((tournament, flags) => {
  const isNotRule = flags?.includes("!");
  const rule = tournament?.[`@${flags.replace("!", "")}`] ?? false;

  return isNotRule ? !rule : rule;
});

// Фильтр по Entrants
const Entrants = curry((totalEntrants, entrants) => Number(totalEntrants) >= Number(entrants));

var curry_1 = {
  curry,
  FromTo,
  FromToName,
  BidGt,
  BidGtName,
  BidName,
  Name,
  FromToGt,
  StartDay,
  Entrants,
  FLAGS,
  NotName,
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
    FromTo: FromToQ,
    FromToName: FromToNameQ,
    BidGt: BidGtQ,
    BidGtName: BidGtNameQ,
    BidName: BidNameQ,
    Name: NameQ,
    FromToGt: FromToGtQ,
    StartDay: StartDayQ,
    NotName: NotNameQ,
    Entrants: EntrantsQ,
    FLAGS: FLAGSQ,
  } = curry_1;
  const { isSuperTurbo: isSuperTurboS } = isSuperTurbo_1;
  const { isTurbo: isTurboS } = isTurbo_1;
  const { isNormal: isNormalS } = isNormal_1;
  const {validateNumber} = validateNumber_1;
  
  const filter = (ruleLevel, tournament, isGetTournaments = false) => {
    const name = tournament["@name"]?.toLowerCase();
      getNetwork(tournament["@network"]);
      const bid = Number(tournament["@usdBid"]),
      prizepool = Math.round(Number(tournament["@usdPrizepool"])),
      weekDay = tournament["@getWeekday"],

      FromTo = FromToQ(bid);
      FromToNameQ(name)(bid);
      BidGtQ(bid)(prizepool);
      BidGtNameQ(name)(bid)(prizepool);
      FromToGtQ(bid)(prizepool);
      EntrantsQ(tournament?.["@totalEntrants"] ?? 0);
      BidNameQ(name)(bid);
      StartDayQ(weekDay);
      NameQ(name);
      NotNameQ(name);
      FLAGSQ(tournament);

    isTurboS(tournament);
    isSuperTurboS(tournament);
    isNormalS(tournament);

    validateNumber(ruleLevel);
    const effmu = 'A';
  
    if (!name || !bid) return { valid: false, guarantee: 1, rules: false };

    if((FromTo(1,1111111))&& effmu === 'A') return { valid: false, guarantee: 1, rules: false };
    
    return { valid: false, guarantee: 1, rules: false };
  };
  
  var filter_1 = {
    filter,
  };

module.exports = filter_1;
