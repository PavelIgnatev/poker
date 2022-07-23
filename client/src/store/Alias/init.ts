import { createEffect } from "effector";
import { $aliases } from "./state";
import api from "../../api";

export const getAliases = createEffect(async () => {
  return await api.get<string[]>("/api/aliases");
});

$aliases.on(getAliases.doneData, (_, aliases) => aliases);

getAliases();
