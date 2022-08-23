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

//Ставка больше либо равно и ставка меньше либо равно
const FromTo = curry((a, b, c) => a >= b && a <= c);

//Ставка больше либо равно и ставка меньше либо равно + name.includes
const FromToName = curry(
  (name, a, b, c, d) => a >= b && a <= c && name.toLowerCase().includes(d.toLowerCase()),
);

//Ставка равно, гарантия больше либо равно
const BidGt = curry((a, b, c, d) => a == c && b >= d);

//Ставка равно, гарантия больше либо равно + name.includes
const BidGtName = curry(
  (name, a, b, c, d, e) => a == c && b >= d && name.toLowerCase().includes(e.toLowerCase()),
);

//тик равно, тикеты больше либо равно + name.includes
const Ticket = curry(
  (name, a, b, c, d, e) => a == c && b >= d && name.toLowerCase().includes(e.toLowerCase()),
);

//Ставка равно + name.includes
const BidName = curry((name, a, b, e) => a == b && name.toLowerCase().includes(e.toLowerCase()));

//name.includes
const Name = curry((name, a) => name.toLowerCase().includes(a.toLowerCase()));

//Ставка больше либо равно и ставка меньше либо равно, гарантия больше либо равно
const FromToGt = curry((a, b, c, d, e) => a >= c && a <= d && b >= e);

//Ставка больше либо равно и ставка меньше либо равно, гарантия больше либо равно
const StartDay = curry((a, b) => a == b);

// Фильтр по флагу
const FLAGS = curry((a, b) => {
  const isNotRule = b?.includes("!");
  const rule = a?.[`@${b.replace("!", "")}`] ?? false;

  return isNotRule ? !rule : rule;
});

// Фильтр по Entrants
const Entrants = curry((a, b) => a >= b);

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
};
