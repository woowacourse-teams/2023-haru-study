import { useEffect, useState } from 'react';

import { sliceArrayByLimit } from '@Utils/index';

const usePagination = (totalPage: number, page: number, limitPageCount: number) => {
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);

  useEffect(() => {
    if (page % limitPageCount === 1) {
      return setCurrentPageArray(totalPageArray[Math.floor(page / limitPageCount)]);
    }

    if (page % limitPageCount === 0) {
      return setCurrentPageArray(totalPageArray[Math.floor(page / limitPageCount) - 1]);
    }
  }, [page, limitPageCount, totalPageArray]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limitPageCount);

    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage, limitPageCount]);

  return { currentPageArray };
};

export default usePagination;
