import { createStore } from "effector";

export const $password = createStore<string>(localStorage.getItem("password") ?? "");

export const $isValidAdminPassword = createStore<boolean>(false);
