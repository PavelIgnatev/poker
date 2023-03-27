import { Effmu } from "./@types/common";

export const LEVELS_COUNT = 18;
export const LEVELS_ARRAY:Array<string | number> = ["A", "B", ...new Array(LEVELS_COUNT).fill(null).map((_, index) => index)];

export const EFFMU: Effmu[] = ["A", "B", "C", "SuperA"];
export const EFFMUOPTIONSWITHOUTSUPERA: Effmu[] = ["A", "B", "C"];
