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
import { css, styled } from 'styled-components';

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

const TabsLayout = styled.div`
  display: grid;
  row-gap: 40px;
`;

const TabList = ({ children }: PropsWithChildren) => {
  return (
    <TabListLayout>
      {Children.map(children, (child, index) => {
        const item = child as ReactElement;

        return cloneElement(item, { index });
      })}
    </TabListLayout>
  );
};

const TabListLayout = styled.ul`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  row-gap: 20px;
`;

type TabItemProps = {
  index?: number;
};

const TAB_ITEM_STYLE = {
  selected: css`
    opacity: 1;
  `,
  unSelected: css`
    opacity: 0.2;
  `,
} as const;

const TabItem = ({ children, index = 0 }: PropsWithChildren<TabItemProps>) => {
  const { selectedPanelIndex, selectPanel } = useTabs();
  const selectedState = selectedPanelIndex === index ? 'selected' : 'unSelected';
  return (
    <TabItemLayout selectedState={selectedState} onClick={() => selectPanel(index)}>
      {children}
    </TabItemLayout>
  );
};

type TabItemLayoutProps = {
  selectedState: keyof typeof TAB_ITEM_STYLE;
};

const TabItemLayout = styled.li<TabItemLayoutProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding-bottom: 5px;

  text-align: center;

  cursor: pointer;

  ${({ selectedState, theme }) => css`
    border-bottom: 2px solid ${theme.text};

    ${TAB_ITEM_STYLE[selectedState]}
  `}
`;

const TabPanels = ({ children }: PropsWithChildren) => {
  const { selectedPanelIndex } = useTabs();
  return (
    <>
      {Children.map(children, (child, index) => {
        if (selectedPanelIndex === index) return child;
        return null;
      })}
    </>
  );
};

const TabPanel = ({ children }: PropsWithChildren) => {
  return children;
};

Tabs.List = TabList;
Tabs.Item = TabItem;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;
