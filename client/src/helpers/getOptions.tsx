export const getOptions = (object: { [key: string]: void } | null) => {
  return Object.keys(object ?? {})
    .sort((a: any, b: any) => a - b)
    .map((el: any) => {
      return { value: el, label: el };
    });
};
