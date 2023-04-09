import { createStore } from "effector";
import { stopWordsModel } from "../../@types/stopWords";

export const $stopWords = createStore<stopWordsModel>([]);
