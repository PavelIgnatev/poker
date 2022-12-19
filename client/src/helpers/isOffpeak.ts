const moment = require("moment");
const MomentRange = require("moment-range");

import { getESTHours } from './getESTHours';
import { tableCellModel } from './../@types/tableCellModel';

MomentRange.extendMoment(moment);


export const isOffpeak = (tournament:tableCellModel, duration = 0) => {
  const offpeak = {} as any;
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
  const fromMs = fromHour * 3600 + fromMinutes * 60;
  const toMs = toHour * 3600 + toMinutes * 60;

  const start = new Date(2022, 4, 23, fromHour + 3, fromMinutes);
  const current = new Date(2022, 4, 23 + (toMs <= fromMs ? 1 : 0), Number(hour) + 3, Number(minutes));
  const currentWithout1 = new Date(2022, 4, 23, Number(hour) + 3, Number(minutes));
  const end = new Date(2022, 4, 23 + (toMs <= fromMs ? 1 : 0), toHour + 3, toMinutes);

  const range = moment.range(start, end);

  if (range.contains(current) || range.contains(currentWithout1)) {
    return true;
  }

  return false;
};
