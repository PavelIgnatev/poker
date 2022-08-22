export type rulesType =
  | "MELE"
  | "MELEI"
  | "EME"
  | "TEMEI"
  | "EMEI"
  | "MELEME"
  | "EI"
  | "eI"
  | "FLAGS"
  | "StartDay"
  | "TotalEntrants";

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
