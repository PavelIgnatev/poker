import { createApi, createEffect } from "effector";
import api from "../../api";
import { $isValidAdminPassword, $isValidAliasPassword } from "./state";

export const { setIsValidAdminPassword } = createApi($isValidAdminPassword, {
  setIsValidAdminPassword: (_: boolean, v: boolean) => v,
});

export const { setIsValidAliasPassword } = createApi($isValidAliasPassword, {
  setIsValidAliasPassword: (_: boolean, v: boolean) => v,
});

export const validateAdminPasswordRequest = createEffect(async (password: string) => {
  const result = await api.checkAdminPassword(password);
  setIsValidAdminPassword(!!result.data);
});

export const validateAliasPasswordRequest = createEffect(
  async ({ alias, password }: { alias: string; password: string }) => {
    const result = await api.checkAliasPassword(alias, password);
    setIsValidAliasPassword(!!result.data);
  },
);
