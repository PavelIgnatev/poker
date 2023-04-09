import { createStore } from "effector";

export interface StoreModel {
  rules: any;
  currency: number;
  offpeak: any;
}

export const DEFAULT_STORE: StoreModel = {
  rules: {},
  currency: 0,
  offpeak: {},
};

export const $store = createStore<StoreModel>(DEFAULT_STORE);
