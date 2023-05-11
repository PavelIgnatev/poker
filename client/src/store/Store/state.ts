import { createStore } from "effector";

export interface StoreModel {
  ability1: any;
  lastValue: any;
}

export const DEFAULT_STORE: StoreModel = {
  ability1: {},
  lastValue: 1,
};

export const $store = createStore<StoreModel>(DEFAULT_STORE);
