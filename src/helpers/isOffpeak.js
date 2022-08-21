const fs = require("fs");

const { getESTHours } = require("../helpers/getESTHours");

const isOffpeak = (tournament) => {
  let offpeak = JSON.parse(fs.readFileSync("src/store/offpeak/offpeak.json", "utf-8"));
  const ESThours = getESTHours(tournament);
  const { from, to } = offpeak;

  const r = to === "00" && from <= to ? "24" : to;
  const ifOFfpeak =
    from <= to ? from <= ESThours && ESThours <= r : !(from > ESThours && ESThours > to);

  return ifOFfpeak;
};

module.exports = { isOffpeak };
