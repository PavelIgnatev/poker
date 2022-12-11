export type Effmu = "A" | "B" | "C" | "all";

export type Network = string;

export type Level = number;

export type NetworkLevels = {
  level: Level;
  effmu: Effmu;
}

export type Networks = Record<Network, NetworkLevels>;

export type Rule = {
  network: Network;
  level: Level;
  currency: string;
  bid: string;
  status: string;
  name: string;
  ability: string;
};

export type LevelPlusEffmu = string;
