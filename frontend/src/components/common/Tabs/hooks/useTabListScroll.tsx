/* eslint-disable react-hooks/exhaustive-deps */
import type { RefObject } from 'react';
import { useCallback, useEffect, useState } from 'react';

const useTabListScroll = (tabList: RefObject<HTMLUListElement>) => {
  const [isTabListOverFlow, setIsTabListOverFlow] = useState(false);
  const [scrollButtonPosition, setScrollButtonPosition] = useState<'start' | 'end' | 'both' | null>(null);

  const hasStartScrollButton = ['start', 'both'].includes(scrollButtonPosition!);
  const hasEndScrollButton = ['end', 'both'].includes(scrollButtonPosition!);

  const handleMoveScroll = (position: 'start' | 'end') => {
    if (!tabList.current) return;

    const { scrollLeft, clientWidth } = tabList.current;

    const moveDistance = (clientWidth * 2) / 3;
    const movedPosition = scrollLeft + (position === 'end' ? +moveDistance : -moveDistance);

    tabList.current.scrollTo({
      left: movedPosition,
      behavior: 'smooth',
    });
  };

  const handleScroll = useCallback(() => {
    const { scrollWidth, clientWidth, scrollLeft } = tabList.current!;

    const isEndOfList = Math.abs(scrollWidth - scrollLeft - clientWidth) < 1;
    const isStartOfList = scrollLeft === 0;

    updateScrollButtonPosition(isEndOfList, isStartOfList);
  }, [isTabListOverFlow, tabList]);

  const updateScrollButtonPosition = (isEndOfList: boolean, isStartOfList: boolean) => {
    if (!isTabListOverFlow) {
      setScrollButtonPosition(null);
      return;
    }

    if (isEndOfList) {
      setScrollButtonPosition('start');
      return;
    }

    if (isStartOfList) {
      setScrollButtonPosition('end');
      return;
    }

    setScrollButtonPosition('both');
  };

  const handleTabListResize: ResizeObserverCallback = useCallback(
    ([tabList]) => {
      const { scrollWidth, clientWidth } = tabList.target;

      if (scrollWidth > clientWidth) setIsTabListOverFlow(true);
      else setIsTabListOverFlow(false);

      handleScroll();
    },
    [handleScroll],
  );

  useEffect(() => {
    const tabListResizeObserver = new ResizeObserver(handleTabListResize);

    if (!tabList.current) return;

    tabListResizeObserver.observe(tabList.current);
    tabList.current.addEventListener('scroll', handleScroll);

    return () => {
      if (!tabList.current) return;

      tabListResizeObserver.unobserve(tabList.current);
      tabList.current.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, handleTabListResize, tabList]);

  return { hasStartScrollButton, hasEndScrollButton, handleMoveScroll };
};

export default useTabListScroll;
