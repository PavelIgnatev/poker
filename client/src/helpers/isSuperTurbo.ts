import { tableCellModel } from "../@types/tableCellModel";

export const isSuperTurbo = (tournament:tableCellModel) => {
    const name = (tournament["@name"] ?? "").toLowerCase();
    const superturbo = tournament["@flags"]?.includes("ST") || name?.includes("hyper");
  
    return superturbo;
  };