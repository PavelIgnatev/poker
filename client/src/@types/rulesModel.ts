export type rulesType =
  | "BidEqual"
  | "BidFrom"
  | "BidTo"
  | "PrizepoolEqual"
  | "PrizepoolFrom"
  | "PrizepoolTo"
  | "AbilityEqual"
  | "AbilityFrom"
  | "AbilityTo"
  | "EntrantsEqual"
  | "EntrantsFrom"
  | "StartRegEqual"
  | "StartRegFrom"
  | "StartRegTo"
  | "LateRegEqual"
  | "LateRegFrom"
  | "LateRegTo"
  | "EntrantsTo"
  | "Name"
  | "NotName"
  | "StartDay"
  | "Flags"
  | "Class"
  | "Structure"
  | "Game";
export interface rulesModel {
  type: rulesType;
  values: Array<string | number>;
  color: string;
  status: string;
  level: string;
  KO: string;
  network: string;
}
