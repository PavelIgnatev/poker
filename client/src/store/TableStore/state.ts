import { createStore } from "effector";
import { tableCellModel } from "../../@types/tableCellModel";
import { $dateEnd, $dateStart } from "../SelectStore";

export const $tableState = createStore<tableCellModel[] | null>(null);

export const $tableStateFiltred = $tableState.map((el) =>
  el?.filter((item) => {
    if(!item["@scheduledStartDate"] || item["@scheduledStartDate"] === '-') return true
    
    const res = item["@scheduledStartDate"]?.split(", ")?.[1]?.split(":")?.[0];
    let r = ($dateEnd.getState() === '00' && ($dateStart.getState() <= $dateEnd.getState())) ? '24' : $dateEnd.getState()
    return $dateStart.getState() <= $dateEnd.getState() ? ($dateStart.getState() <= res && res <= r) : !($dateStart.getState() > res && res > $dateEnd.getState() )
  })
);
