import { Networks } from "./common";

export interface ConfigModel {
  alias: string;
  networks: Networks;
  mail: string;
  password: string;
  timezone: string;
  address: string | null;
}

export interface defaultConfigModel {
  alias: string;
  level: number;
  mail: string;
  password: string;
  timezone: string;
  address: string | null;
}
