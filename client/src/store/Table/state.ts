import { createStore } from "effector";
import { tableCellModel } from "../../@types/tableCellModel";

export const $tableState = createStore<tableCellModel[] | null>(null);
