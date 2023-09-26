import { useCallback, useEffect, useRef, useState } from 'react';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

import LeftArrow from '@Assets/icons/LeftArrowIcon';
import RightArrow from '@Assets/icons/RightArrowIcon';

import { useTabs } from './TabsContext';

const TabList = () => {
  const { tabs, selectedTab, changeTab } = useTabs();

  const [isOverFlow, setIsOverFlow] = useState(false);
  const [scrollButtonPosition, setScrollButtonPosition] = useState<'start' | 'end' | 'both' | null>(null);

  const hasStartScrollButton = scrollButtonPosition === 'start' || scrollButtonPosition === 'both';
  const hasEndScrollButton = scrollButtonPosition === 'end' || scrollButtonPosition === 'both';

  console.log(scrollButtonPosition);

  const tabList = useRef<HTMLUListElement>(null);

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

    if (!isOverFlow) setScrollButtonPosition(null);
  }, [isOverFlow]);

  const handleTabListResize: ResizeObserverCallback = useCallback(
    ([tabList]) => {
      const { scrollWidth, clientWidth } = tabList.target;

      if (scrollWidth > clientWidth) setIsOverFlow(true);
      else setIsOverFlow(false);

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
  }, [handleScroll, handleTabListResize]);

  return (
    <Layout>
      {hasStartScrollButton && (
        <ScrollButton position="left">
          <div>
            <LeftArrow color={color.neutral[500]} />
          </div>
        </ScrollButton>
      )}
      <TabListContainer ref={tabList}>
        {tabs.map((tab, index) => {
          const isSelected = tab === selectedTab;

          return (
            <Tab data-testid="tab" onClick={() => changeTab(tab)} key={`${tab}${index}`} $isSelected={isSelected}>
              {tab}
            </Tab>
          );
        })}
      </TabListContainer>
      {hasEndScrollButton && (
        <ScrollButton position="right">
          <div>
            <RightArrow color={color.neutral[500]} />
          </div>
        </ScrollButton>
      )}
    </Layout>
  );
};

export default TabList;

const Layout = styled.div`
  position: relative;
`;

const TabListContainer = styled.ul`
  width: 100%;
  display: flex;
  row-gap: 20px;

  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;

type ScrollButtonProps = {
  position: 'left' | 'right';
};

const SCROLL_BUTTON_STYLE = {
  left: css`
    left: -5px;

    & > div {
      justify-content: flex-start;
      background: linear-gradient(to left, #ffffffc5, #ffffff);
    }
  `,
  right: css`
    right: -5px;

    & > div {
      justify-content: flex-end;
      background: linear-gradient(to right, #ffffffc5, #ffffff);
    }
  `,
} as const;

const ScrollButton = styled.div<ScrollButtonProps>`
  position: absolute;
  top: 0;
  height: 100%;

  display: flex;
  align-items: center;

  padding-bottom: 5px;
  border-bottom: 2px solid transparent;

  z-index: 5;

  & > div {
    display: flex;
    align-items: center;
    width: 20px;
    height: 105%;
  }

  svg {
    cursor: pointer;

    width: 16px;
    height: 16px;
  }

  ${({ position }) => css`
    ${SCROLL_BUTTON_STYLE[position]}
  `}
`;

type TabProps = {
  $isSelected: boolean;
};

const Tab = styled.li<TabProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0px 10px 5px;

  font-size: 1.8rem;
  text-align: center;

  cursor: pointer;

  ${({ $isSelected, theme }) => css`
    border-bottom: 2px solid ${theme.text};

    opacity: ${$isSelected ? '1' : '0.2'};
  `}
`;
