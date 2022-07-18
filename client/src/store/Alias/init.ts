import { createApi, createEffect, createStore } from "effector";
import { $alias, $aliases } from "./state";
import api from "../../api";

export const { handleChangeAlias } = createApi($alias, {
  handleChangeAlias: (_: string, v: string) => v,
});

export const getAliases = createEffect(async () => {
  return await api.get<string[]>("/api/aliases");
});

$aliases.on(getAliases.doneData, (_, aliases) => aliases);

getAliases();
