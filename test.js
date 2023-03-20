const { getTournaments } = require("./src/helpers/getTournaments");
const { getMoreProp } = require("./src/helpers/getMoreProp");
const { getDate } = require("./src/helpers/getDate");

const fs = () => {
  const { tournaments: state } = getTournaments();

  Object.values(state)
    .flat(1)
    .forEach((t) => {
      if (t["@name"] === "Bounty Hunters Deepstack Turbo $54") {
        const ft = getMoreProp(t);

        if (ft["@prizepool"] >= 40000 && ft["@date"] >= 1677525300) {
          console.log(ft);
        }
      }
    });
};

fs();
