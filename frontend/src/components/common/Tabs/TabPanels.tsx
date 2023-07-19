import { Children, PropsWithChildren } from 'react';

import { useTabs } from './TabsContext';

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

export default TabPanels;
