import { css, styled } from 'styled-components';

import { useTabs } from './TabsContext';

const TabList = () => {
  const { tabs, selectedTab, changeTab } = useTabs();

  return (
    <TabListLayout>
      {tabs.map((tab, index) => {
        const isSelected = tab === selectedTab;

        return (
          <Tab onClick={() => changeTab(tab)} key={`${tab}${index}`} isSelected={isSelected}>
            {tab}
          </Tab>
        );
      })}
    </TabListLayout>
  );
};

export default TabList;

const TabListLayout = styled.ul`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  row-gap: 20px;
`;

type TabProps = {
  isSelected: boolean;
};

const Tab = styled.li<TabProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding-bottom: 5px;

  text-align: center;

  cursor: pointer;

  ${({ isSelected, theme }) => css`
    border-bottom: 2px solid ${theme.text};

    opacity: ${isSelected ? '1' : '0.2'};
  `}
`;
