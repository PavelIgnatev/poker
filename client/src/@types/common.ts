export type Effmu = "A";

export type Network = string;

export type Level = number;

export type NetworkLevels = {
  level: Level;
}

export type Networks = Record<Network, NetworkLevels>;

export type Rule = {
  network: Network;
  level: Level;
  bid: string;
  status: string;
  name: string;
  ability: string;
};

export type LevelPlusEffmu = string;
