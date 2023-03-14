import { Networks } from "./common";

export interface ConfigModel {
  alias: string;
  networks: Networks;
  password: string;
  timezone: string;
}

export interface defaultConfigModel {
  alias: string;
  level: number;
  password: string;
  timezone: string;
}
