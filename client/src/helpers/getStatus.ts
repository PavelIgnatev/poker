import { isSuperTurbo } from './isSuperTurbo';
import { isTurbo } from './isTurbo';
import { isNormal } from './isNormal';
import { tableCellModel } from './../@types/tableCellModel';


export const getStatus = (tournament:tableCellModel) => {
  const KO = isNormal(tournament);
  const turbo = isTurbo(tournament);
  const superturbo = isSuperTurbo(tournament);
  const status = `${KO ? "KO" : "!KO"}${superturbo ? "SuperTurbo" : turbo ? "Turbo" : "Normal"}`;
  return status;
};
