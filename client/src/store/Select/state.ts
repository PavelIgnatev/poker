import { createStore } from 'effector';
import { SingleValue, MultiValue } from 'react-select';
import { selectModel } from '../../@types/selectsModel';

export const $level = createStore<SingleValue<selectModel>>(null);
export const $network = createStore<MultiValue<selectModel> | null>(null);
export const $makeUp = createStore<SingleValue<selectModel>>(null);
export const $time = createStore<SingleValue<selectModel>>(null);
export const $timezone = createStore<SingleValue<selectModel>>(null);
export const $timezoneTable = createStore<string>('');
export const $alias = createStore<string>('');
export const $moneyStart = createStore<number>(1);
export const $moneyEnd = createStore<number>(100);
export const $onlyKO = createStore<boolean>(false);
export const $onlyTurbo = createStore<boolean>(false);
export const $onlySuperTurbo = createStore<boolean>(false);
export const $onlyFreezout = createStore<boolean>(false);
export const $onlyNormal = createStore<boolean>(false);
export const $dateStart = createStore<string>('00');
export const $dateEnd = createStore<string>('00');

export const $stateLevel = [
  { value: '1', label: '1 level', moneyStart: 1, moneyEnd: 100 },
  { value: '2', label: '2 level', moneyStart: 1, moneyEnd: 130 },
  { value: '3', label: '3 level', moneyStart: 1, moneyEnd: 160 },
  { value: '4', label: '4 level', moneyStart: 1, moneyEnd: 190 },
  { value: '5', label: '5 level', moneyStart: 1, moneyEnd: 220 },
  { value: '6', label: '6 level', moneyStart: 1, moneyEnd: 240 },
  { value: '7', label: '7 level', moneyStart: 1, moneyEnd: 270 },
  { value: '8', label: '8 level', moneyStart: 1, moneyEnd: 290 },
  { value: '9', label: '9 level', moneyStart: 1, moneyEnd: 310 },
  { value: '10', label: '10 level', moneyStart: 1, moneyEnd: 340 },
  { value: '11', label: '11 level', moneyStart: 1, moneyEnd: 370 },
  { value: '12', label: '12 level', moneyStart: 1, moneyEnd: 400 },
  { value: '13', label: '13 level', moneyStart: 1, moneyEnd: 430 },
  { value: '14', label: '14 level', moneyStart: 1, moneyEnd: 460 },
  { value: '15', label: '15 level', moneyStart: 1, moneyEnd: 490 },
  { value: '16', label: '16 level', moneyStart: 1, moneyEnd: 10000 },
];

export const $stateNetwork = [
  { value: 'PokerStars', label: 'PS.eu' },
  { value: 'iPoker', label: 'IP' },
  { value: 'Chico', label: 'Chico' },
  { value: 'PokerStars(FR-ES-PT)', label: 'PS.es' },
  { value: 'PartyPoker', label: 'Party' },
  { value: 'GGNetwork', label: 'GG' },
  { value: '888Poker', label: '888' },
  { value: 'Winamax', label: 'WNMX' },
  { value: 'WPN', label: 'WPN' },
];

export const $stateTime = [
  { value: '600', label: '<10 minutes' },
  { value: '3600', label: '<1 hour' },
  { value: '43200', label: '<12 hours' },
  { value: '86400', label: '<24 hours' },
  { value: '604800', label: '<1 week' },
];

export const $stateMakeup = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
];

export const $stateTimezone = [
  { value: '-28800000', label: 'ET' },
  { value: '0', label: 'MSK' },
];
