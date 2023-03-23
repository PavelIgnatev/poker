import { createEffect } from "effector";

import { $filterContent } from "./state";

import api from "../../api";

export const fetchFilterContent = createEffect(async () => {
  const result = await api.get("api/filter");

  try {
    // @ts-ignore
    const { filter } = new Function(
      // @ts-ignore
      result.replace(
        // @ts-ignore
        "module.exports = filter_1;",
        // @ts-ignore
        "return { filter: filter_1};"
        // @ts-ignore
      )
      // @ts-ignore
    )();

    return filter.filter;
  } catch (error) {}
});

$filterContent.on(fetchFilterContent.doneData, (_, data) => data);
