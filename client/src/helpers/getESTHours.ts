import { tableCellModel } from './../@types/tableCellModel';

export const getESTHours = (tournament:tableCellModel, duration = 0) => {
  const isStartDate:any = tournament["@date"] ?? 0;
  const startDate = Number(isStartDate * 1000 - duration);

  return new Date(startDate).toLocaleString("en-EN", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    timeZone: 'UTC'
  });
};
