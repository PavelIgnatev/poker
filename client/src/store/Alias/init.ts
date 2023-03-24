import { createEffect, createApi } from "effector";
import { $aliases } from "./state";
import api from "../../api";

export const aliasesEvents = createApi($aliases, {
  addAlias: (store, alias: string) => [...store, alias],
  deleteAlias: (store, alias: string) => store.filter((a) => a !== alias),
});

export const getAliasesRequest = createEffect(async (level?: number | string) => {
  return await api.get<string[]>("/api/aliases", { level });
});

$aliases.on(getAliasesRequest.doneData, (store, aliases) => aliases);
