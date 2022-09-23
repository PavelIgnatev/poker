const fs = require("fs");
const moment = require("moment");
const MomentRange = require("moment-range");
MomentRange.extendMoment(moment);

const { getESTHours } = require("../helpers/getESTHours");

const isOffpeak = (tournament, duration = 0) => {
  const offpeak = JSON.parse(fs.readFileSync("src/store/offpeak/offpeak.json", "utf-8"));
  const [hour, minutes] = getESTHours(tournament, duration).split(":");

  const {
    fromHour: fromHourQ,
    fromMinutes: fromMinutesQ,
    toHour: toHourQ,
    toMinutes: toMinutesQ,
  } = offpeak;

  const fromHour = Number(fromHourQ);
  const fromMinutes = Number(fromMinutesQ);
  const toHour = Number(toHourQ);
  const toMinutes = Number(toMinutesQ);

  const start = new Date(2022, 4, 23, fromHour + 3, fromMinutes);
  const current = new Date(2022, 4, 23 + (toHour <= fromHour ? 1 : 0), Number(hour) + 3, minutes);
  const currentWithout1 = new Date(2022, 4, 23, Number(hour) + 3, minutes);
  const end = new Date(2022, 4, 23 + (toHour <= fromHour ? 1 : 0), toHour + 3, toMinutes);

  const range = moment.range(start, end);

  if (range.contains(current) || range.contains(currentWithout1)) {
    return true;
  }

  return false;
};

module.exports = { isOffpeak };
