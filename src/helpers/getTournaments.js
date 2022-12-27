const { readFileSync, readdirSync } = require("fs");
const { decompress } = require("compress-json");

const { getNetwork } = require("./getNetwork");
const { isSat } = require("./IsSat");
const { isRebuy } = require("./isRebuy");
const { isSuperTurbo } = require("./isSuperTurbo");

const getTournaments = () => {
  const days = readdirSync("src/store/days").map((day) => day.replace(".json", ""));
  const filtredState = {};

  // Получаем 90 последних дней
  const state = days
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .splice(0, Math.min(days.length, 90))
    .reduce((accumulator, day) => {
      const currentDay = readFileSync(`src/store/days/${day}.json`, {
        encoding: "utf8",
        flag: "r",
      });

      return { ...accumulator, [day]: decompress(JSON.parse(currentDay)) };
    }, {});

  Object.keys(state).forEach((day) => {
    if (!filtredState[day]) filtredState[day] = {};

    filtredState[day] = state[day]?.filter((item) => {
      const od = item["@flags"]?.includes("OD"),
        sng = item["@gameClass"]?.includes("sng"),
        isNL = item["@structure"] === "NL",
        isH = item["@game"] === "H" || item["@game"] === "H6",
        name = item["@name"],
        sat = isSat(item);

      const network = getNetwork(item["@network"]);

      const rebuy = isRebuy(item);

      if (!name) return false;

      const superturbo = network === "WNMX" ? false : isSuperTurbo(item);

      if (isNL && isH && !rebuy && !od && !sng && !sat && !superturbo) {
        return true;
      }
      return false;
    });
  });

  return { tournaments: state, filtredTournaments: filtredState };
};

module.exports = { getTournaments };
