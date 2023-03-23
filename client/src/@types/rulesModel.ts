export type rulesType =
  | "Name"
  | "BidEqual"
  | "BidFrom"
  | "BidTo"
  | "PrizepoolEqual"
  | "PrizepoolFrom"
  | "PrizepoolTo"
  | "StartDay"
  | "Flags"
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
