import { createEffect } from "effector";

import api from "../../api";
import { $update } from "./state";
import { UpdateModel } from "../../@types/updateModel";

export const getUpdate = createEffect(
  async () => await api.get<UpdateModel>("/api/update")
);

export const postUpdate = createEffect(
  async () => {
    await api.postUpdate();
  }
);

$update.on(getUpdate.doneData, (_, update) => update);
