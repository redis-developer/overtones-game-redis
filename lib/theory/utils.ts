export const findKey = (dict: object, name: string): string | undefined => {
  let key;

  Object.keys(dict).forEach((k) => {
    if (dict[k].names.includes(name)) {
      key = k;
    }
  });

  return key;
};
