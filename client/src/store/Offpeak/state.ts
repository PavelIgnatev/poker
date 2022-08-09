import { offpeakModel } from "../../@types/offpeakModel";
import { createStore } from "effector";

export const $offpeak = createStore<offpeakModel>({ from: "00", to: "24" });
