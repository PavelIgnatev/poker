export type rulesType =
  | "FromTo"
  | "FromToName"
  | "BidGt"
  | "BidGtName"
  | "FromToGt"
  | "BidName"
  | "Name"
  | "NotName"
  | "FLAGS"
  | "StartDay"
  | "Entrants";

export interface rulesModel {
  type: rulesType;
  values: Array<string | number>;
  color: string;
  status: string;
  level: string;
  KO: string;
  network: string;
}
