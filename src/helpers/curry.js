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
const MELE = curry((a, b, c) => a >= b && a <= c);

//Ставка больше либо равно и ставка меньше либо равно + name.includes
const MELEI = curry(
  (name, a, b, c, d) => a >= b && a <= c && name.toLowerCase().includes(d.toLowerCase()),
);

//Ставка равно, гарантия больше либо равно
const EME = curry((a, b, c, d) => a == c && b >= d);

//Ставка равно, гарантия больше либо равно + name.includes
const EMEI = curry(
  (name, a, b, c, d, e) => a == c && b >= d && name.toLowerCase().includes(e.toLowerCase()),
);

//тик равно, тикеты больше либо равно + name.includes
const TEMEI = curry(
  (name, a, b, c, d, e) => a == c && b >= d && name.toLowerCase().includes(e.toLowerCase()),
);

//Ставка равно + name.includes
const EI = curry((name, a, b, e) => a == b && name.toLowerCase().includes(e.toLowerCase()));

//name.includes
const I = curry((name, a) => name.toLowerCase().includes(a.toLowerCase()));

//Ставка больше либо равно и ставка меньше либо равно, гарантия больше либо равно
const MELEME = curry((a, b, c, d, e) => a >= c && a <= d && b >= e);

//Ставка больше либо равно и ставка меньше либо равно, гарантия больше либо равно
const StartDay = curry((a, b) => a == b);

// Фильтр по флагу
const FLAGS = curry((a, b) => {
  const isNotRule = b?.includes("!");
  const rule = a?.[`@${b.replace("!", "")}`] ?? false;

  return isNotRule ? !rule : rule;
});

// Фильтр по TotalEntrants
const TotalEntrants = curry((a, b) => a >= b);

module.exports = {
  curry,
  MELE,
  MELEI,
  EME,
  TEMEI,
  EMEI,
  MELEME,
  EI,
  StartDay,
  I,
  TotalEntrants,
  FLAGS,
};
