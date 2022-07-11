import { createEffect } from "effector";
import { tableCellModel } from "../../@types/tableCellModel";
import api from "../../api";
import { ErrNot } from "../../components/NotificationService";
import {
  $dateEnd,
  $dateStart,
  $makeUp,
  $level,
  $moneyEnd,
  $moneyStart,
  $network,
  $onlyFreezout,
  $onlyKO,
  $onlyTurbo,
  $time,
  $alias,
  $onlyNormal,
  $timezone,
  handleChangeTimezoneTable,
  $onlySuperTurbo,
} from "../SelectStore";
import { $tableState } from "./state";

export const fetchUserReposFx = createEffect(async () => {
  const level = $level.getState()?.value,
    network = $network.getState(),
    time = $time.getState()?.value,
    moneyStart = $moneyStart.getState(),
    moneyEnd = $moneyEnd.getState(),
    dateEnd = $dateEnd.getState(),
    dateStart = $dateStart.getState(),
    timezone = $timezone.getState()?.value,
    makeUp = $makeUp.getState()?.value,
    onlyKO = $onlyKO.getState(),
    onlyTurbo = $onlyTurbo.getState(),
    onlySuperTurbo = $onlySuperTurbo.getState(),
    onlyFreezout = $onlyFreezout.getState(),
    onlyNormal = $onlyNormal.getState(),
    alias = $alias.getState();
 
  if (!level) ErrNot("Level filter: You have not chosen a level");
  if (!alias) ErrNot("Enter an alias");
  if (!network?.length)
    ErrNot("Network filter: You have not selected a network");
  if (!time) ErrNot("Time is less filter: You haven't chosen the time");
  if (!moneyStart || !moneyEnd || moneyStart > moneyEnd)
    ErrNot("Buy-in filter: Invalid buy-in filter rules");
  if (Number(dateStart) > 23)
    ErrNot('Time from-before filter: Invalid "From" time filter rules');
  if (Number(dateEnd) > 23)
    ErrNot('Time from-before filter: Invalid "To" time filter rules');
  if (!makeUp) ErrNot("Eff. MU: You have not selected a Eff. MU");
  if (!timezone) ErrNot("Timezone: You have not selected a timezone");

  if (
    !level ||
    !alias ||
    !network?.length ||
    !time ||
    !moneyStart ||
    !moneyEnd ||
    moneyStart > moneyEnd ||
    Number(dateEnd) > 23 ||
    Number(dateStart) > 23 ||
    !makeUp ||
    !timezone
  )
    return [];

  try {
    const result = await api.get<tableCellModel[]>("/api/tour", {
      networks: network.map((elem) => elem.value).join(","),
      time,
      level: level + makeUp,
      moneyStart,
      moneyEnd,
      onlyKO,
      onlyTurbo,
      onlySuperTurbo,
      onlyFreezout,
      onlyNormal,
      timezone,
      alias,
    });

    handleChangeTimezoneTable($timezone.getState()?.label ?? "");
    return result;
  } catch {
    ErrNot("The request failed. Try again.");
  }
});

$tableState.on(fetchUserReposFx.doneData, (_, data) => data);
