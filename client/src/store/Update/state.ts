import { createStore } from "effector";

import { UpdateModel } from "../../@types/updateModel";

export const $update = createStore<UpdateModel>({
  isUpdated: false,
  timestamp: 0,
});
