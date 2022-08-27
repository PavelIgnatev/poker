export const getUniqueElemKeyGetter = (elem: string) => {
  const getter = (prefix?: string) => getUniqueElemKeyGetter(elem + prefix);
  getter.key = elem;
  return getter;
};
