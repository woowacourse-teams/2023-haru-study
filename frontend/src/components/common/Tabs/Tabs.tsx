import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

import TabItem from './TabItem';
import TabList from './TabList';
import TabPanel from './TabPanel';
import TabPanels from './TabPanels';
import { TabsProvider } from './TabsContext';

const Tabs = ({ children }: PropsWithChildren) => {
  return (
    <TabsProvider>
      <TabsLayout>{children}</TabsLayout>
    </TabsProvider>
  );
};

export default Tabs;

Tabs.List = TabList;
Tabs.Item = TabItem;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

const TabsLayout = styled.div`
  display: grid;
  row-gap: 40px;
`;
