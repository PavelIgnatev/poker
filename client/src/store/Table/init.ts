import { editableTournamentsSettings } from "./../Select/init";
import { createEffect } from "effector";
import { tableCellModel } from "../../@types/tableCellModel";
import api from "../../api";
import { $tournamentsSettings } from "../Select";
import { $tableState } from "./state";
import { ErrNot } from "../../components/NotificationService";
import { $config } from "../Config";

export const fetchUserReposFx = createEffect(async () => {
  const tournamentsSettings = $tournamentsSettings.getState();
  const config = $config.getState();

  try {
    const result = await api.get<tableCellModel[]>("/api/tour", {
      ...tournamentsSettings,
      //@ts-ignore
      network: tournamentsSettings.network.map((elem) => elem.value).join(","),
      timezone: tournamentsSettings.timezone?.value ?? 0,
      time: tournamentsSettings.time?.value ?? 0,
      alias: config?.alias,
    });

    editableTournamentsSettings.handleChangeTimezonetable(
      tournamentsSettings?.timezone?.label ?? "",
    );

    return result;
  } catch {
    ErrNot("The request failed. Try again.");
  }
});

$tableState.on(fetchUserReposFx.doneData, (_, data) => data);
