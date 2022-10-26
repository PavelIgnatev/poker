export type Effmu = "A" | "B" | "C" | "all";

export type Network = string;

export type Level = number;

export type Networks = Record<Network, Level>;

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
