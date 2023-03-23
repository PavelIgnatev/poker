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
const StartDay = curry((realDay, day) => String(realDay) === String(day));
const Name = curry((name, str) => name.toLowerCase().includes(str.toLowerCase()));
const Flags = curry((tournament, flags) => {
  const isNotRule = flags?.includes("!");
  const rule = tournament?.[`@${flags.replace("!", "")}`] ?? false;

  return isNotRule ? !rule : rule;
});
const Entrants = curry((totalEntrants, entrants) => Number(totalEntrants) >= Number(entrants));

module.exports = {
  curry,
  BidEqual,
  BidFrom,
  BidTo,
  PrizepoolEqual,
  PrizepoolFrom,
  PrizepoolTo,
  Name,
  StartDay,
  Entrants,
  Flags,
};
