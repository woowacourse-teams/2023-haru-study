/* eslint-disable react-hooks/exhaustive-deps */
import type { RefObject } from 'react';
import { useCallback, useEffect, useState } from 'react';

const useTabListScroll = (tabList: RefObject<HTMLUListElement>) => {
  const [isTabListOverFlow, setIsTabListOverFlow] = useState(false);
  const [scrollButtonPosition, setScrollButtonPosition] = useState<'start' | 'end' | 'both' | null>(null);

  const hasStartScrollButton = scrollButtonPosition === 'start' || scrollButtonPosition === 'both';
  const hasEndScrollButton = scrollButtonPosition === 'end' || scrollButtonPosition === 'both';

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

    if (isEndOfList) setScrollButtonPosition('start');
    else if (scrollLeft === 0) setScrollButtonPosition('end');
    else setScrollButtonPosition('both');

    if (!isTabListOverFlow) setScrollButtonPosition(null);
  }, [isTabListOverFlow, tabList]);

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
