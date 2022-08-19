export type rulesType =
  | "MELE"
  | "MELEI"
  | "EME"
  | "TEMEI"
  | "EMEI"
  | "MELEME"
  | "EI"
  | "I"
  | "FLAGS"
  | "StardDay";

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
