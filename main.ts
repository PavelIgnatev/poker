interface f {
  type: string;
  color: string; // потом доабвим цветов
  level: string; //15A
  network: string;
  values: Array<string | number>;
  offpeak: boolean;
  status: "isNormal" | "isTurbo" | "isSuperTurbo";
  KO: boolean; // выбрано KO - true, иначе false
}
