export const sliceArrayByLimit = (totalPage: number, limit: number) => {
  const totalPageArray = Array(totalPage)
    .fill(0)
    .map((_, index) => index);

  return Array(Math.ceil(totalPage / limit))
    .fill(0)
    .map(() => totalPageArray.splice(0, limit));
};

export const getKeys = <T extends object, S extends string>(obj: InvariantOf<T>, options: Readonly<S[]> = []) => {
  return [...Object.keys(obj), ...options];
};

export const invariantOf = <T>(arg: T) => arg as InvariantOf<T>;

export const transformJsonToString = <T extends object>(json: T) => {
  const formattedString = Object.entries(invariantOf(json));

  return formattedString;
};
