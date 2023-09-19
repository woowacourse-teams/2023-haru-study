import { css, styled } from 'styled-components';

import { useTabs } from './TabsContext';

const TabList = () => {
  const { tabs, selectedTab, changeTab } = useTabs();

  return (
    <TabListLayout>
      {tabs.map((tab, index) => {
        const isSelected = tab === selectedTab;

        return (
          <Tab data-testid="tab" onClick={() => changeTab(tab)} key={`${tab}${index}`} $isSelected={isSelected}>
            {tab}
          </Tab>
        );
      })}
    </TabListLayout>
  );
};

export default TabList;

const TabListLayout = styled.ul`
  width: 100%;
  display: flex;
  row-gap: 20px;

  overflow-x: scroll;
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
