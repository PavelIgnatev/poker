import { getNetwork } from './getNetwork';
import { tableCellModel } from './../@types/tableCellModel';

export const isRebuy = (tournament:tableCellModel) => {
  const name = tournament["@name"]?.toLowerCase();
  const network = getNetwork(tournament["@network"]);

  return network === "888"
    ? name?.includes("r&a")
    : tournament["@flags"]?.includes("R") && !tournament["@flags"]?.includes("RH");
};
