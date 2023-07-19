import { PropsWithChildren } from 'react';
import { css, styled } from 'styled-components';

import { useTabs } from './TabsContext';

const TAB_ITEM_STYLE = {
  selected: css`
    opacity: 1;
  `,
  unSelected: css`
    opacity: 0.2;
  `,
} as const;

type TabItemProps = {
  index?: number;
};

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

export default TabItem;
