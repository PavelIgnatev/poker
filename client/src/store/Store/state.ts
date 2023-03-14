import { createStore } from "effector";

export interface StoreModel {
  ability1: any;
  currency: number;
}

export const DEFAULT_STORE: StoreModel = {
  ability1: {},
  currency: 0,
};

export const $store = createStore<StoreModel>(DEFAULT_STORE);
