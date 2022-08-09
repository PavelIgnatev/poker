export const getSelectOptionsFromKeys = (object: { [key: string]: void } | null) => {
  return Object.keys(object ?? {})
    .sort()
    .map((key) => {
      return { value: key, label: key };
    });
};
