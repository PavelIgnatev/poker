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
const MELEI = curry((name, a, b, c, d) => a >= b && a <= c && name.includes(d));

//Ставка равно, гарантия больше либо равно
const EME = curry((a, b, c, d) => a == c && b >= d);

//Ставка равно, гарантия больше либо равно + name.includes
const EMEI = curry((name, a, b, c, d, e) => a == c && b >= d && name.includes(e));

//тик равно, тикеты больше либо равно + name.includes
const TEMEI = curry((name, a, b, c, d, e) => a == c && b >= d && name.includes(e));

//Ставка равно + name.includes
const EI = curry((name, a, b, e) => a == b && name.includes(e));

//name.includes
const I = curry((name, a) => name.includes(a));

//Ставка больше либо равно и ставка меньше либо равно, гарантия больше либо равно
const MELEME = curry((a, b, c, d, e) => a >= c && a <= d && b >= e);

//Ставка больше либо равно и ставка меньше либо равно, гарантия больше либо равно
const StartDay = curry((a, b) => a == b);

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
};
