import { createStore } from "effector";

export interface StoreModel {
  ability1: any;
}

export const DEFAULT_STORE: StoreModel = {
  ability1: {},
};

export const $store = createStore<StoreModel>(DEFAULT_STORE);
