import { useRef } from 'react';
import { css, styled } from 'styled-components';

import TabListScrollButton from './TabListScrollButton';
import { useTabs } from './TabsContext';
import useTabListScroll from './hooks/useTabListScroll';

const TabList = () => {
  const tabList = useRef<HTMLUListElement>(null);

  const { tabs, selectedTab, changeTab } = useTabs();
  const { hasStartScrollButton, hasEndScrollButton, handleMoveScroll } = useTabListScroll(tabList);

  return (
    <Layout>
      {hasStartScrollButton && <TabListScrollButton position="left" moveScroll={() => handleMoveScroll('start')} />}
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
      {hasEndScrollButton && <TabListScrollButton position="right" moveScroll={() => handleMoveScroll('end')} />}
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
