import { Effmu, Networks } from "./common";

export interface ConfigModel {
  alias: string;
  networks: Networks;
  effmu: Effmu;
  mail: string;
}

export interface defaultConfigModel {
  alias: string;
  level: number;
  effmu: Effmu;
  mail: string;
}
