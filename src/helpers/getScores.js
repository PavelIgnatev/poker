const { readFileSync, readdirSync } = require("fs");
const { decompress } = require("compress-json");

const getScores = () => {
  const days = readdirSync("src/store/score").map((day) => day.replace(".json", ""));

  // Получаем 90 последних дней
  const state = days
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .splice(0, Math.min(days.length, 90))
    .reduce((accumulator, day) => {
      const currentDay = readFileSync(`src/store/score/${day}.json`, {
        encoding: "utf8",
        flag: "r",
      });

      return { ...accumulator, [day]: decompress(JSON.parse(currentDay)) };
    }, {});

  return state
};


module.exports = { getScores };
