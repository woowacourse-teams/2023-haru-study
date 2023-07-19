import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

const DEFAULT_PANEL_INDEX = 0;

const TabsContext = createContext({
  selectedPanelIndex: DEFAULT_PANEL_INDEX,
  selectPanel: (index: number) => {
    alert(`ERROR: ${index}을 호출한 곳이 적절하지 않습니다.`);
  },
});

export const useTabs = () => useContext(TabsContext);

export const TabsProvider = ({ children }: PropsWithChildren) => {
  const [selectedPanelIndex, setSelectedPanelIndex] = useState(DEFAULT_PANEL_INDEX);

  const selectPanel = (index: number) => setSelectedPanelIndex(index);

  const value = useMemo(() => ({ selectedPanelIndex, selectPanel }), [selectedPanelIndex]);

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
