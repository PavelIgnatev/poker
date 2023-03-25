const { readFileSync, readdirSync } = require("fs");
const { decompress } = require("compress-json");


const getTournaments = () => {
  const days = readdirSync("src/store/days").map((day) => day.replace(".json", ""));
  const filtredState = {};

  const state = days.reduce((accumulator, day) => {
    const currentDay = readFileSync(`src/store/days/${day}.json`, {
      encoding: "utf8",
      flag: "r",
    });

    return { ...accumulator, [day]: decompress(JSON.parse(currentDay)) };
  }, {});

  Object.keys(state).forEach((day) => {
    if (!filtredState[day]) filtredState[day] = {};

    filtredState[day] = state[day];
  });

  return { tournaments: state, filtredTournaments: filtredState };
};

module.exports = { getTournaments };
