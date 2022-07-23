import { createApi } from "effector";
import { MultiValue, SingleValue } from "react-select";
import { selectModel } from "../../@types/selectsModel";
import { $tournamentsSettings } from "./state";

export const editableTournamentsSettings = createApi($tournamentsSettings, {
  handleChangeNetwork: (setting, network: MultiValue<selectModel>) => ({
    ...setting,
    network,
  }),
  handleChangeTime: (setting, time: SingleValue<selectModel>) => ({
    ...setting,
    time,
  }),
  handleChangeTimezone: (setting, timezone: SingleValue<selectModel>) => ({
    ...setting,
    timezone,
  }),
  handleChangeTimezonetable: (setting, timezoneTable: string) => ({
    ...setting,
    timezoneTable,
  }),
  handleChangeMoneyStart: (setting, moneyStart: number) => ({
    ...setting,
    moneyStart,
  }),
  handleChangeMoneyEnd: (setting, moneyEnd: number) => ({
    ...setting,
    moneyEnd,
  }),
  handleChangeDateStart: (setting, dateStart: string) => ({
    ...setting,
    dateStart,
  }),
  handleChangeDateEnd: (setting, dateEnd: string) => ({
    ...setting,
    dateEnd,
  }),
  handleChangeKo: (setting, KO: boolean) => ({
    ...setting,
    KO,
  }),
  handleChangeTurbo: (setting, turbo: boolean) => ({
    ...setting,
    turbo,
  }),
  handleChangeSuperTurbo: (setting, superTurbo: boolean) => ({
    ...setting,
    superTurbo,
  }),
  handleChangeFreezout: (setting, freezout: boolean) => ({
    ...setting,
    freezout,
  }),
  handleChangeNormal: (setting, normal: boolean) => ({
    ...setting,
    normal,
  }),
});
