import { createStore } from "effector";

export const $alias = createStore<string>("");

export const $aliases = createStore<string[]>([]);
