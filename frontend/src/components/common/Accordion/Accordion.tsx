/* eslint-disable react-hooks/rules-of-hooks */
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

const Accordion = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default Accordion;

const AccordionContext = createContext({
  isOpen: false,
  toggleOpenState: () => {},
});

const useAccordionContext = () => useContext(AccordionContext);

Accordion.Item = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenState = () => setIsOpen((prev) => !prev);

  const value = useMemo(() => ({ isOpen, toggleOpenState }), [isOpen]);

  return (
    <div>
      <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>
    </div>
  );
};

Accordion.Header = ({ children }: PropsWithChildren) => {
  const { isOpen, toggleOpenState } = useAccordionContext();

  return (
    <div>
      {children}
      <button onClick={toggleOpenState}>{isOpen ? '닫기' : '열기'}</button>
    </div>
  );
};

Accordion.Panel = ({ children }: PropsWithChildren) => {
  const { isOpen } = useAccordionContext();

  return <div>{isOpen && children}</div>;
};
