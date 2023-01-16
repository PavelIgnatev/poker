const { readFile, writeFile } = require("../../utils/promisify");
const { getStatus } = require("../../helpers/getStatus");
const { getSheduledDate } = require("../../helpers/getSheduledDate");
const { getMoreProp } = require("../../helpers/getMoreProp");
const { getTimeByMS } = require("../../helpers/getTimeByMS");
const { getCurrencyRate } = require("../currencyRate/getCurrencyRate");
const { getTournaments } = require("../../helpers/getTournaments");
let filter = require("../filter/filter");
const { getRules } = require("../../utils/rules");

const updateAbility2 = async () => {
  delete require.cache[require.resolve("../filter/filter")];
  filter = require("../filter/filter");

  const lastValue = await getCurrencyRate();
  const levels = Array(17)
    .fill(null)
    .map((_, i) => i);

  const config = JSON.parse(await readFile("src/store/rules/config.json"));

  const { filtredTournaments: state } = getTournaments();
  const ability2ZeroStateRedBlue = [];
  const ability2ZeroStateAny = [];
  const allRules = await getRules();
  const fromTo = {};

  const { count } = JSON.parse(await readFile("src/store/sample/sample.json"));

  const obj = {};
  levels.forEach((l) => {
    console.log("Начал обновлять уровень ", l);
    Object.values(state).forEach((tournaments) => {
      Object.values(tournaments).forEach((ft) => {
        const t = getMoreProp(ft); //add properties for filter
        const s = getStatus(t); //status
        const b = t["@bid"]; //bid
        const r = t["@network"]; //network - room
        const n = t["@name"]?.toLowerCase(); //name
        const c = t["@currency"]; //currency
        const pp = t["@prizepool"] >= 0 ? t["@prizepool"] : "-";
        t["@usdBid"] = c === "CNY" ? b / lastValue : b;
        t["@usdPrizepool"] = c === "CNY" && pp !== "-" ? pp / lastValue : pp;

        if (!b || !r || !n || !c) {
          return;
        }

        const { valid } = filter.filter(l, t);

        if (!obj) obj = {};
        if (!obj[r]) obj[r] = {};
        if (!obj[r][l]) obj[r][l] = {};
        if (!obj[r][l][c]) obj[r][l][c] = {};
        if (!obj[r][l][c][b]) obj[r][l][c][b] = {};
        if (!obj[r][l][c][b][s]) obj[r][l][c][b][s] = {};
        if (!obj[r][l][c][b][s][n]) obj[r][l][c][b][s][n] = [];

        if (!valid) {
          return;
        }
        const result = {};

        result["a"] = t["@avability"];
        result["d"] = t["@duration"];
        result["g"] = t["@guarantee"];
        result["n"] = t["@name"];
        result["b"] = t["@bid"];
        result["p"] = t["@prizepool"];
        result["s"] = getSheduledDate(t);

        obj[r][l][c][b][s][n].push(result);
      });
    });
  });

  Object.keys(obj).forEach((r) => {
    Object.keys(obj[r]).forEach((l) => {
      Object.keys(obj[r][l]).forEach((c) => {
        Object.keys(obj[r][l][c]).forEach((b) => {
          Object.keys(obj[r][l][c][b]).forEach((s) => {
            let result = [];

            Object.keys(obj[r][l][c][b][s]).forEach((n) => {
              const values = obj[r][l][c][b][s][n];

              if (values?.length >= Number(count)) {
                result.push(...values);
              }
            });

            result = result
              .sort((a, b) => Number(b["@date"] ?? 0) - Number(a["@date"] ?? 0))
              .splice(0, 21);

            obj[r][l][c][b][s] = result;
          });
        });
      });
    });
  });

  await writeFile("src/store/ability2/formingAbility2.json", JSON.stringify(obj));

  Object.keys(obj).forEach((r) => {
    Object.keys(obj[r]).forEach((l) => {
      Object.keys(obj[r][l]).forEach((c) => {
        //Тут типо среднее значение для каких-то турниров
        Object.keys(obj[r][l][c]).forEach((b) => {
          Object.keys(obj[r][l][c][b]).forEach((s) => {
            const v = obj[r][l][c][b][s];
            const length = v.length;

            obj[r][l][c][b][s] = Math.round(v.reduce((r, i) => r + +i["a"] ?? 0, 0) / length) || 0;
          });
        });
      });
    });
  });

  await writeFile("src/store/ability2/ability2WithoutName.json", JSON.stringify(obj));

  const obj2 = {};

  const ability1 = JSON.parse(await readFile("src/store/ability1/ability1.json"));

  levels.forEach((l) => {
    Object.values(state).forEach((tournaments) => {
      Object.values(tournaments).forEach((ft) => {
        //Тут типо для всех турниров для правил, получаем абилити2 конкретного турнира
        const t = getMoreProp(ft); //add properties for filter
        const s = getStatus(t); //status
        const b = t["@bid"]; //bid
        const r = t["@network"]; //network - room
        const n = t["@name"]?.toLowerCase(); //name
        const c = t["@currency"]; //currency
        const isStartDate = ft["@date"] ?? 0;
        const time = getTimeByMS(Number(`${isStartDate}000`));

        const ability2 = obj?.[r]?.[l]?.[c]?.[b]?.[s];

        if (!b || !r || !n || !c) {
          return;
        }

        const ability = ability1?.[r]?.[time]?.[t["@bid"]]?.[n]?.["@avability"] ?? "-";

        if (!obj2) obj2 = {};
        if (!obj2[r]) obj2[r] = {};
        if (!obj2[r][l]) obj2[r][l] = {};
        if (!obj2[r][l][c]) obj2[r][l][c] = {};
        if (!obj2[r][l][c][b]) obj2[r][l][c][b] = {};
        if (!obj2[r][l][c][b][s]) obj2[r][l][c][b][s] = {};

        obj2[r][l][c][b][s][t["@name"] + ` (A1: ${ability})(${time})`] = ability2;
      });
    });
  });

  await writeFile("src/store/ability2/ability2.json", JSON.stringify(obj2));
};

module.exports = {
  updateAbility2,
};
