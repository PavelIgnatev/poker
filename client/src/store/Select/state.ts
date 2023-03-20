import { tournamentsSettingsProps } from "./types";
import { createStore } from "effector";

export const TIMEZONES = [
  { value: "-43200000", label: "UTC-12 (IDLW)" },
  { value: "-39600000", label: "UTC-11 (NT)" },
  { value: "-36000000", label: "UTC-10 (HST)" },
  { value: "-32400000", label: "UTC-9 (AKT)" },
  { value: "-28800000", label: "UTC-8 (PT)" },
  { value: "-25200000", label: "UTC-7 (MT)" },
  { value: "-21600000", label: "UTC-6 (CT)" },
  { value: "-18000000", label: "UTC-5 (ET)" },
  { value: "-14400000", label: "UTC-4 (AT)" },
  { value: "-10800000", label: "UTC-3 (BRT)" },
  { value: "-7200000", label: "UTC-2 (AT)" },
  { value: "-3600000", label: "UTC-1 (AZOT)" },
  { value: "0", label: "UTC" },
  { value: "3600000", label: "UTC+1 (CET )" },
  { value: "7200000", label: "UTC+2 (EET)" },
  { value: "10800000", label: "UTC+3 (MSK)" },
  { value: "14400000", label: "UTC+4 (AZT)" },
  { value: "18000000", label: "UTC+5 (PKT)" },
  { value: "21600000", label: "UTC+6 (ALMT)" },
  { value: "25200000", label: "UTC+7 (ICT)" },
  { value: "28800000", label: "UTC+8 (AWST)" },
  { value: "32400000", label: "UTC+9 (JST)" },
  { value: "36000000", label: "UTC+10 (AEST)" },
  { value: "39600000", label: "UTC+11 (AET)" },
  { value: "43200000", label: "UTC+12 (NZST)" },
];

export const TIMERANGE = [
  { value: "600", label: "<10 minutes" },
  { value: "3600", label: "<1 hour" },
  { value: "10800", label: "<3 hours" },
  { value: "21600", label: "<6 hours" },
  { value: "43200", label: "<12 hours" },
  { value: "86400", label: "<24 hours" },
  { value: "604800", label: "<1 week" },
];

export const EFFMU = [{ value: "A", label: "A" }];

export const NETWORKS = [
  { value: "PokerStars", label: "PokerStars" },
  { value: "PokerStars(FR-ES-PT)", label: "PokerStars(FR-ES-PT)" },
  { value: "PartyPoker", label: "PartyPoker" },
  { value: "888Poker", label: "888Poker" },
  { value: "Chico", label: "Chico" },
  { value: "WPN", label: "WPN" },
  { value: "iPoker", label: "iPoker" },
  { value: "GGNetwork", label: "GGNetwork" },
  { value: "Winamax.fr", label: "Winamax.fr" },
];

export const SHORT_NETWORKS = [
  { value: "PokerStars", label: "PokerStars" },
  { value: "PokerStars(FR-ES-PT)", label: "PokerStars(FR-ES-PT)" },
  { value: "PartyPoker", label: "PartyPoker" },
  { value: "888Poker", label: "888Poker" },
  { value: "Chico", label: "Chico" },
  { value: "WPN", label: "WPN" },
  { value: "iPoker", label: "iPoker" },
  { value: "GGNetwork", label: "GGNetwork" },
  { value: "Winamax.fr", label: "Winamax.fr" },
  { value: "all", label: "all" },
];

export const DEFAULT_EDITABLE_TOURNAMENTS_SETTINGS: tournamentsSettingsProps = {
  network: null,
  time: TIMERANGE[2],
  timezone: TIMEZONES[12],
  timezoneTable: null,
  prizepoolStart: 0,
  prizepoolEnd: 10000000,
  moneyStart: 0,
  moneyEnd: 10000,
  KO: true,
  turbo: true,
  superTurbo: true,
  freezout: true,
  normal: true,
  dateStart: "00",
  dateEnd: "24",
};

export const $tournamentsSettings = createStore<tournamentsSettingsProps>(
  DEFAULT_EDITABLE_TOURNAMENTS_SETTINGS
);
