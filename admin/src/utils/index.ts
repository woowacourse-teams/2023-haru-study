export const sliceArrayByLimit = (totalPage: number, limit: number) => {
  const totalPageArray = Array(totalPage)
    .fill(0)
    .map((_, index) => index);

  return Array(Math.ceil(totalPage / limit))
    .fill(0)
    .map(() => totalPageArray.splice(0, limit));
};
