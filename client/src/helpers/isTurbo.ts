import { isSat } from './isSat';
import { isSuperTurbo } from './isSuperTurbo';
import { tableCellModel } from "../@types/tableCellModel";
import { getNetwork } from "./getNetwork";

export const isTurbo = (tournament:tableCellModel) => {
    let flags = tournament["@flags"];
    const name = (tournament["@name"] ?? "").toLowerCase();
    const network = getNetwork(tournament["@network"]);
    const superturbo = isSuperTurbo(tournament);
    const sat = isSat(tournament);
    if ((sat && flags) || flags?.includes("SAT")) flags = flags.replace("SAT", "");
  
    const turbo =
      (flags?.includes("T") ||
        name?.includes("turbo") ||
        (network === "PokerStars" && name?.includes("hot"))) &&
      !superturbo;
  
    return turbo;
  };