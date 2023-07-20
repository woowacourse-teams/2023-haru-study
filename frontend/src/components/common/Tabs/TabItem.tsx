/* eslint-disable react-hooks/exhaustive-deps */
import { PropsWithChildren, useEffect } from 'react';

import { useTabs } from './TabsContext';

type TabItemProps = {
  label: string;
};

const TabItem = ({ children, label }: PropsWithChildren<TabItemProps>) => {
  const { selectedTab, registerTab } = useTabs();

  const isSelected = label === selectedTab;

  useEffect(() => {
    registerTab(label);
  }, []);

  if (!isSelected) return null;

  return children;
};

export default TabItem;
