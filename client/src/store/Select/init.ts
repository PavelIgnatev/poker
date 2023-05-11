import { createApi } from "effector";
import { MultiValue, SingleValue } from "react-select";
import { selectModel } from "../../@types/selectsModel";
import { $tournamentsSettings, TIMEZONES } from "./state";

export const editableTournamentsSettings = createApi($tournamentsSettings, {
  handleChangeNetwork: (setting, network: MultiValue<selectModel>) => {
    localStorage.setItem("networks", JSON.stringify(network));
    return {
      ...setting,
      network,
    };
  },
  handleChangeTime: (setting, time: SingleValue<selectModel>) => ({
    ...setting,
    time,
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
  handleChangePrizepoolStart: (setting, prizepoolStart: number) => ({
    ...setting,
    prizepoolStart,
  }),
  handleChangePrizepoolEnd: (setting, prizepoolEnd: number) => ({
    ...setting,
    prizepoolEnd,
  }),
  handleChangeDateStart: (setting, dateStart: string) => ({
    ...setting,
    dateStart: String(Number(dateStart) >= 24 ? 24 : dateStart),
  }),
  handleChangeDateEnd: (setting, dateEnd: string) => ({
    ...setting,
    dateEnd: String(Number(dateEnd) >= 24 ? 24 : dateEnd),
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
  handleChangeTimezone: (setting, timezone: typeof TIMEZONES[15]) => ({
    ...setting,
    timezone,
  }),
});
