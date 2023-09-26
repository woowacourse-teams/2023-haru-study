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

    // scrollWidth: 스크롤까지 포함한 전체 너비
    // clientWidth: 실제 화면에 보이는 너비
    // scrollLeft: 가로로 스크롤한 너비
    const isEndOfList = Math.abs(scrollWidth - scrollLeft - clientWidth) < 1;

    // 스크롤이 끝 지점으로 이동했을 때
    if (isEndOfList) setScrollButtonPosition('start');
    // 스크롤이 앞 지점에 있을 때
    else if (scrollLeft === 0) setScrollButtonPosition('end');
    // 양쪽에 스크롤이 생길 때
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
