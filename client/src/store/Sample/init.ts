import { sampleModel } from "./../../@types/sampleModel";
import { createEffect, createApi } from "effector";
import api from "../../api";
import { $sample } from "./state";

export const getSample = createEffect(async () => {
  const result = await api.get<sampleModel>("/api/sample");

  return result.count;
});

export const postSample = createEffect(async ({ sample }: { sample: string }) => {
  await api.postSample(sample);
});

export const { handleChangeSample } = createApi($sample, {
  handleChangeSample: (_, sample: string) => sample,
});

$sample.on(getSample.doneData, (_, sample) => sample);
