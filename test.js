const { getTournaments } = require("./src/helpers/getTournaments");
const { getMoreProp } = require("./src/helpers/getMoreProp");
const filter = require("./src/modules/filter/filter");
const { getDate } = require("./src/helpers/getDate");

const fs = () => {
  const { tournaments: state } = getTournaments();

  Object.values(state)
    .flat(1)
    .forEach((ts) => {
      if (ts["@name"] === "Bounty Hunters Deepstack Turbo $54") {
        const t = getMoreProp(ts);

        const d = Number(t["@duration"] ?? 0);
        const name = t["@name"]?.toLowerCase();

        const currency = t["@currency"];
        const bid = t["@bid"];
        const isStartDate = Number(t["@date"] ?? t["@scheduledStartDate"] ?? 0);

        const data = new Date(Number(Number(`${isStartDate - d}000`)))
          .toLocaleString("en-EN", {
            hour12: false,
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "numeric",
            timeZone: "UTC",
          })
          .replace(", 24", ", 00")
          .split(", ");

        const startDate = Number(isStartDate * 1000);

        const pp = t["@prizepool"] >= 0 ? t["@prizepool"] : "-";
        t["@ability"] = "-";
        t["@abilityBid"] = "-";
        t["@getWeekday"] = "Friday";
        t["@realDuration"] = d;
        t["@nickname"] = t?.["TournamentEntry"]?.["@playerName"] ?? "undefined";
        t["@prize"] = t?.["TournamentEntry"]?.["@prize"] ?? 0;
        t["@d"] = data[0];
        t["@times"] = data[1];
        t["@multientries"] = t?.["TournamentEntry"]?.["@multientries"] ?? 0;
        t["@usdBid"] = currency === "CNY" ? Math.round(Number(bid) / lastValue) : Number(bid);
        t["@usdPrizepool"] =
          currency === "CNY" && pp !== "-" ? Math.round(Number(pp) / lastValue) : Number(pp);

      }
    });
};

fs();
