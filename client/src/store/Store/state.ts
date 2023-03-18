import { createStore } from "effector";

export interface StoreModel {
  ability1: any;
  ability2: any;
  rules: any;
  currency: number;
  offpeak: any;
}

export const DEFAULT_STORE: StoreModel = {
  ability1: {},
  ability2: {},
  rules: {},
  currency: 0,
  offpeak: {},
};

export const $store = createStore<StoreModel>(DEFAULT_STORE);
