import { PropsWithChildren, createContext, useContext, useMemo } from 'react';

import useDisplay from '@Hooks/useDisplay';

const AccordionContext = createContext({
  isShow: false,
  show: () => {},
  hide: () => {},
});

export const useAccordion = () => useContext(AccordionContext);

export const AccordionProvider = ({ children }: PropsWithChildren) => {
  const { isShow, show, hide } = useDisplay();

  const value = useMemo(() => ({ isShow, show, hide }), [isShow, show, hide]);

  return <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>;
};
