import { rulesModel } from "./../../@types/rulesModel";
import { createStore } from "effector";

export const $rules = createStore<Array<rulesModel[]> | null>(null);
