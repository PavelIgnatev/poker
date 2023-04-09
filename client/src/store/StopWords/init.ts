import { stopWordsModel } from './../../@types/stopWords';
import { createEffect } from "effector";
import api from "../../api";
import { $stopWords } from './state';



export const getStopWords = createEffect(async () => {
  const result = await api.get<stopWordsModel>("/api/stopwords");

  return result;
});


export const postStopWords = createEffect(async (stopWords: stopWordsModel ) => {
  await api.postStopWords(stopWords);

  return stopWords;
});


$stopWords.on(getStopWords.doneData, (_, stopWords) => stopWords)
$stopWords.on(postStopWords.doneData, (_, stopWords) => stopWords)