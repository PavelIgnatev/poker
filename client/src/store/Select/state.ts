import { tournamentsSettingsProps } from "./types";
import { createStore } from "effector";

export const TIMEZONES = [
  { value: "0", label: "UTC, WET" },
  { value: "-36000000", label: "HST" }, // UTC-10
  { value: "-32400000", label: "AKT" }, // UTC-9
  { value: "-28800000", label: "PT" }, // UTC- 8
  { value: "-25200000", label: "MT" }, // UTC- 7
  { value: "-21600000", label: "CT" }, // UTC- 6
  { value: "-18000000", label: "ET" }, // UTC- 5
  { value: "-14400000", label: "AT" }, // UTC- 4
  { value: "-12600000", label: "NT" }, // UTC- 3:30
  { value: "-10800000", label: "ART" }, // UTC- 3
  { value: "-7200000", label: "BRT" }, // UTC- 2
  { value: "3600000", label: "CET" }, // UTC +1
  { value: "7200000", label: "EET" }, // UTC+2
  { value: "10800000", label: "MSK" }, // UTC+3
  { value: "19800000", label: "IST" }, // UTC +5:30
  { value: "32400000", label: "JST" }, // UTC +9
  { value: "28800000", label: "AWST, CCT" }, // UTC +8
  { value: "34200000", label: "ACST" }, // UTC +9:30
  { value: "36000000", label: "AEST" }, // UTC +10
];

export const TIMERANGE = [
  { value: "600", label: "<10 minutes" },
  { value: "3600", label: "<1 hour" },
  { value: "43200", label: "<12 hours" },
  { value: "86400", label: "<24 hours" },
  { value: "604800", label: "<1 week" },
];

export const EFFMU = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
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

export const SHORT_NETWORKS = [
  { value: "PS.eu", label: "PS.eu" },
  { value: "IP", label: "IP" },
  { value: "Chico", label: "Chico" },
  { value: "PS.es", label: "PS.es" },
  { value: "Party", label: "Party" },
  { value: "GG", label: "GG" },
  { value: "888", label: "888" },
  { value: "WNMX", label: "WNMX" },
  { value: "WPN", label: "WPN" },
];

export const DEFAULT_EDITABLE_TOURNAMENTS_SETTINGS: tournamentsSettingsProps = {
  network: null,
  time: TIMERANGE[1],
  timezone: TIMEZONES[0],
  timezoneTable: null,
  prizepoolStart: 0,
  prizepoolEnd: 10000000,
  moneyStart: 1,
  moneyEnd: 10000,
  KO: false,
  turbo: false,
  superTurbo: false,
  freezout: false,
  normal: false,
  dateStart: "00",
  dateEnd: "24",
};

export const $tournamentsSettings = createStore<tournamentsSettingsProps>(
  DEFAULT_EDITABLE_TOURNAMENTS_SETTINGS
);
