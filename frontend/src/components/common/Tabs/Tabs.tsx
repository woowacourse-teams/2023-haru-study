import type { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

import TabItem from './TabItem';
import TabList from './TabList';
import { TabsProvider } from './TabsContext';

const Tabs = ({ children }: PropsWithChildren) => {
  return (
    <TabsProvider>
      <TabsLayout>
        <TabList />
        {children}
      </TabsLayout>
    </TabsProvider>
  );
};

export default Tabs;

Tabs.Item = TabItem;

const TabsLayout = styled.div`
  display: grid;
  row-gap: 40px;
`;
