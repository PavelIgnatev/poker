import { createEffect } from "effector";
import api from "../../api";
import { $settings } from "./state";

export const fetchSettings = createEffect(async () => {
  const result = await api.get<any>("/api/settings");
  return result;
});

export const postFetchSettings = createEffect(async (json: any) => {
  const result = await api.addSettings(json);
  return result;
});

$settings.on(fetchSettings.doneData, (_, settings) => settings);
