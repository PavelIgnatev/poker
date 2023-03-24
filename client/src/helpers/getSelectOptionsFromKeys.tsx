export const getSelectOptionsFromKeys = (object: { [key: string]: void } | null) => {
  return Object.keys(object ?? {})
    .sort((a, b) => {
      if (String(a) < String(b)) {
        return -1;
      } else if (String(a) > String(b)) {
        return 1;
      } else {
        return 0;
      }
    })
    .map((key) => {
      return { value: key, label: key };
    });
};
