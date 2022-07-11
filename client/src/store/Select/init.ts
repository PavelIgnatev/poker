import { createApi } from "effector";
import { MultiValue, SingleValue } from "react-select";
import { selectModel } from "../../@types/selectsModel";
import {
  $makeUp,
  $level,
  $moneyEnd,
  $moneyStart,
  $network,
  $onlyKO,
  $onlyTurbo,
  $onlyFreezout,
  $onlyNormal,
  $time,
  $alias,
  $dateStart,
  $dateEnd,
  $timezone,
  $timezoneTable,
  $onlySuperTurbo,
} from "./state";

const cb = (_: SingleValue<selectModel>, v: SingleValue<selectModel>) => v;
const cbMulti = (
  _: MultiValue<selectModel> | null,
  v: MultiValue<selectModel>
) => [...v];
const cbMoney = (_: number, v: number) => v;
const cbDate = (_: string, v: string) => v;
const cbCheckbox = (_: boolean, v: boolean) => v;

export const { handleChangeLevel } = createApi($level, {
  handleChangeLevel: cb,
});

export const { handleChangeTime } = createApi($time, {
  handleChangeTime: cb,
});

export const { handleChangeIsMakeupB } = createApi($makeUp, {
  handleChangeIsMakeupB: cb,
});

export const { handleChangeNetwork } = createApi($network, {
  handleChangeNetwork: cbMulti,
});

export const { handleChangeMoneyStart } = createApi($moneyStart, {
  handleChangeMoneyStart: cbMoney,
});

export const { handleChangeMoneyEnd } = createApi($moneyEnd, {
  handleChangeMoneyEnd: cbMoney,
});

export const { handleChangeDateStart } = createApi($dateStart, {
  handleChangeDateStart: cbDate,
});

export const { handleChangeDateEnd } = createApi($dateEnd, {
  handleChangeDateEnd: cbDate,
});

export const { handleChangeOnlyKO } = createApi($onlyKO, {
  handleChangeOnlyKO: cbCheckbox,
});

export const { handleChangeOnlyFreezout } = createApi($onlyFreezout, {
  handleChangeOnlyFreezout: cbCheckbox,
});

export const { handleChangeOnlyNormal } = createApi($onlyNormal, {
  handleChangeOnlyNormal: cbCheckbox,
});

export const { handleChangeOnlyTurbo } = createApi($onlyTurbo, {
  handleChangeOnlyTurbo: cbCheckbox,
});

export const { handleChangeOnlySuperTurbo } = createApi($onlySuperTurbo, {
  handleChangeOnlySuperTurbo: cbCheckbox,
});

export const { handleChangeTimezone } = createApi($timezone, {
  handleChangeTimezone: cb,
});

export const { handleChangeTimezoneTable } = createApi($timezoneTable, {
  handleChangeTimezoneTable: cbDate,
});

export const { handleChangeAlias } = createApi($alias, {
  handleChangeAlias: cbDate,
});

$level.watch((v) => {
  handleChangeMoneyStart(v?.moneyStart ?? 1);
  handleChangeMoneyEnd(v?.moneyEnd ?? 1);
});
