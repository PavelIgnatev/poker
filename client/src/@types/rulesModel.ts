export type rulesType =
  | "FromTo"
  | "FromToName"
  | "BidGt"
  | "Ticket"
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
  status: string;
  level: string;
  KO: string;
  network: string;
}
