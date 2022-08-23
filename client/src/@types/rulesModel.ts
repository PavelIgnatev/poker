export type rulesType =
  | "FromTo"
  | "FromToName"
  | "BidGt"
  | "Ticket"
  | "BidGtName"
  | "FromToGt"
  | "BidName"
  | "Name"
  | "FLAGS"
  | "StartDay"
  | "Entrants";

export interface rulesModel {
  type: rulesType;
  values: Array<string | number>;
  color: string;
  status: string;
  level: string;
  offpeak: boolean;
  KO: boolean;
  network: string;
}
