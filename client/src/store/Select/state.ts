import { tournamentsSettingsProps } from "./types";
import { createStore } from "effector";

export const DEFAULT_EDITABLE_TOURNAMENTS_SETTINGS: tournamentsSettingsProps = {
  network: null,
  time: null,
  timezone: null,
  timezoneTable: null,
  moneyStart: 1,
  moneyEnd: 1000,
  KO: false,
  turbo: false,
  superTurbo: false,
  freezout: false,
  normal: false,
  dateStart: "00",
  dateEnd: "00",
};

export const $tournamentsSettings = createStore<tournamentsSettingsProps>(
  DEFAULT_EDITABLE_TOURNAMENTS_SETTINGS,
);

export const EFFMU = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
];

export const NETWORKS = [
  { value: "PokerStars", label: "PS.eu" },
  { value: "iPoker", label: "IP" },
  { value: "Chico", label: "Chico" },
  { value: "PokerStars(FR-ES-PT)", label: "PS.es" },
  { value: "PartyPoker", label: "Party" },
  { value: "GGNetwork", label: "GG" },
  { value: "888Poker", label: "888" },
  { value: "Winamax", label: "WNMX" },
  { value: "WPN", label: "WPN" },
];

export const TIMERANGE = [
  { value: "600", label: "<10 minutes" },
  { value: "3600", label: "<1 hour" },
  { value: "43200", label: "<12 hours" },
  { value: "86400", label: "<24 hours" },
  { value: "604800", label: "<1 week" },
];

export const TIMEZONES = [
  { value: "-28800000", label: "ET" },
  { value: "0", label: "MSK" },
];
