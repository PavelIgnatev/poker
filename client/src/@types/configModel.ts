export interface ConfigModel {
  networks: Record<string, number>;
  effmu: "A" | "B";
  mail: string;
}

export interface defaultConfigModel {
  alias: string;
  level: number;
  effmu: "A" | "B";
  mail: string;
}
