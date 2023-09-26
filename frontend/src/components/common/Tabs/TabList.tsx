import { useRef } from 'react';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

import LeftArrow from '@Assets/icons/LeftArrowIcon';
import RightArrow from '@Assets/icons/RightArrowIcon';

import { useTabs } from './TabsContext';
import useTabListScroll from './hooks/useTabListScroll';

const TabList = () => {
  const tabList = useRef<HTMLUListElement>(null);

  const { tabs, selectedTab, changeTab } = useTabs();
  const { hasStartScrollButton, hasEndScrollButton, handleMoveScroll } = useTabListScroll(tabList);

  return (
    <Layout>
      {hasStartScrollButton && (
        <ScrollButton position="left">
          <div>
            <LeftArrow color={color.neutral[500]} onClick={() => handleMoveScroll('start')} />
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
            <RightArrow color={color.neutral[500]} onClick={() => handleMoveScroll('end')} />
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
    width: 16px;
    height: 16px;

    cursor: pointer;
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
