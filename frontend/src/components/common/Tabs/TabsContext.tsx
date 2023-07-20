import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

const TabsContext = createContext({
  tabs: [] as string[],
  selectedTab: null as string | null,
  registerLabel: (label: string) => {
    alert(`ERROR: ${label}을 호출한 곳이 적절하지 않습니다.`);
  },
  changeTab: (label: string) => {
    alert(`ERROR: ${label}을 호출한 곳이 적절하지 않습니다.`);
  },
});

export const useTabs = () => useContext(TabsContext);

export const TabsProvider = ({ children }: PropsWithChildren) => {
  const [tabs, setTabs] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const registerLabel = (label: string) => {
    setTabs((prev) => [...prev, label]);
  };

  const changeTab = (label: string) => setSelectedTab(label);

  useEffect(() => {
    const firstTab = tabs[0];

    setSelectedTab(firstTab);
  }, [tabs]);

  const value = useMemo(() => ({ tabs, selectedTab, registerLabel, changeTab }), [tabs, selectedTab]);

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
