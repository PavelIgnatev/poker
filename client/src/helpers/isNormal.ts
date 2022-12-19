import { tableCellModel } from "../@types/tableCellModel";


export const isNormal = (tournament:tableCellModel) => {
    const name = (tournament["@name"] ?? "").toLowerCase();
  
    return !!(tournament["@flags"]?.includes("B") || name?.includes("bounty"));
  };
  