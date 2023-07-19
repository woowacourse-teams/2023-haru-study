import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

const VisionContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export const useVision = () => useContext(VisionContext);

export const VisionProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen]);

  return <VisionContext.Provider value={value}>{children}</VisionContext.Provider>;
};
