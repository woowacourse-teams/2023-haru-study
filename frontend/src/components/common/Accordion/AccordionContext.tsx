import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

const AccordionContext = createContext({
  isPanelOpen: false,
  openPanel: () => {},
  closePanel: () => {},
});

export const useAccordion = () => useContext(AccordionContext);

export const AccordionProvider = ({ children }: PropsWithChildren) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  const value = useMemo(() => ({ isPanelOpen, openPanel, closePanel }), [isPanelOpen]);

  return <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>;
};
