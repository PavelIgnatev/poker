import { tableCellModel } from './../@types/tableCellModel';

export const isRebuy = (tournament:tableCellModel) => {
  return tournament["@flags"]?.includes("R") && !tournament["@flags"]?.includes("RH");
};
