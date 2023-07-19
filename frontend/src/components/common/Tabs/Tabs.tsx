import {
  Children,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { styled } from 'styled-components';

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

const Tabs = ({ children }: PropsWithChildren) => {
  return (
    <TabsProvider>
      <TabsLayout>{children}</TabsLayout>
    </TabsProvider>
  );
};

export default Tabs;

const TabsLayout = styled.div``;

const TabList = ({ children }: PropsWithChildren) => {
  return (
    <div>
      {Children.map(children, (child, index) => {
        const item = child as ReactElement;

        return cloneElement(item, { index });
      })}
    </div>
  );
};

type TabItemProps = {
  index?: number;
};

const TabItem = ({ children, index }: PropsWithChildren<TabItemProps>) => {
  const { selectPanel } = useTabs();
  return <div onClick={() => selectPanel(index)}>{children}</div>;
};

type TabPanelProps = {
  value: string | number;
};

const TabPanels = ({ children }: PropsWithChildren) => {
  const { selectedPanelIndex } = useTabs();
  return (
    <div>
      {Children.map(children, (child, index) => {
        if (selectedPanelIndex === index) return child;
        return null;
      })}
    </div>
  );
};

const TabPanel = ({ children }: PropsWithChildren<TabPanelProps>) => {
  return <div>{children}</div>;
};

Tabs.List = TabList;
Tabs.Item = TabItem;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;
