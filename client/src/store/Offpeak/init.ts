import { offpeakModel } from "../../@types/offpeakModel";
import { createEffect, createApi } from "effector";
import api from "../../api";
import { $offpeak } from "./state";

export const getOffpeak = createEffect(async () => {
  const result = await api.get<offpeakModel>("/api/offpeak");

  return result;
});

export const postOffpeak = createEffect(
  async (offpeak: offpeakModel) => await api.postOffpeak(offpeak),
);

export const {
  handleChangeOffpeakFromHour,
  handleChangeOffpeakToHour,
  handleChangeOffpeakToMinutes,
  handleChangeOffpeakFromMinutes,
} = createApi($offpeak, {
  handleChangeOffpeakFromHour: (offpeak, from: string) => ({
    ...offpeak,
    fromHour: String(Number(from) >= 24 ? 23 : from),
  }),
  handleChangeOffpeakToHour: (offpeak, to: string) => ({
    ...offpeak,
    toHour: String(Number(to) >= 24 ? 23 : to),
  }),
  handleChangeOffpeakFromMinutes: (offpeak, from: string) => ({
    ...offpeak,
    fromMinutes: String(Number(from) >= 60 ? 59 : from),
  }),
  handleChangeOffpeakToMinutes: (offpeak, to: string) => ({
    ...offpeak,
    toMinutes: String(Number(to) >= 60 ? 59 : to),
  }),
});

$offpeak.on(getOffpeak.doneData, (_, offpeak) => offpeak);
