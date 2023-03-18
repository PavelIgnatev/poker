import { offpeakModel } from "../../@types/offpeakModel";
import { createStore } from "effector";

export const $offpeak = createStore<offpeakModel>({
  fromHour: "00",
  fromMinutes: "00",
  toHour: "24",
  toMinutes: "00",
});
