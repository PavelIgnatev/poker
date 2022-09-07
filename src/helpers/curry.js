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
// Ticket = TicketQ(name)(bid)(tournament["@tickets"] ?? 0);
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

//тик равно, тикеты больше либо равно + name.includes
const Ticket = curry(
  (name, realBid, realTickets, bid, tickets, str) =>
    BidGt(realBid, realTickets, bid, tickets) && Name(name, str),
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

module.exports = {
  curry,
  FromTo,
  FromToName,
  BidGt,
  BidGtName,
  Ticket,
  BidName,
  Name,
  FromToGt,
  StartDay,
  Entrants,
  FLAGS,
  NotName,
};
