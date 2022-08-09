import { offpeakModel } from "../../@types/offpeakModel";
import { createEffect, createApi, sample } from "effector";
import api from "../../api";
import { $offpeak } from "./state";

export const getOffpeak = createEffect(async () => {
  const result = await api.get<offpeakModel>("/api/offpeak");

  return result;
});

export const postOffpeak = createEffect(
  async (offpeak: offpeakModel) => await api.postOffpeak(offpeak),
);

export const { handleChangeOffpeakFrom, handleChangeOffpeakTo } = createApi($offpeak, {
  handleChangeOffpeakFrom: (offpeak, from: string) => ({
    ...offpeak,
    from: String(Number(from) >= 24 ? 24 : from),
  }),
  handleChangeOffpeakTo: (offpeak, to: string) => ({
    ...offpeak,
    to: String(Number(to) >= 24 ? 24 : to),
  }),
});

$offpeak.on(getOffpeak.doneData, (_, offpeak) => offpeak);
