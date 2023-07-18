/* eslint-disable react-hooks/rules-of-hooks */
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';
import { styled } from 'styled-components';

import color from '@Styles/color';

import Button from '../Button/Button';

const Accordion = ({ children }: PropsWithChildren) => {
  return <AccordionLayout>{children}</AccordionLayout>;
};

export default Accordion;

const AccordionLayout = styled.div`
  padding: 25px 40px;
  border: 1px solid ${color.neutral[200]};
  border-radius: 14px;
`;

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
    <AccordionHeaderLayout>
      {children}
      <Button variant="secondary" size="x-small" onClick={toggleOpenState}>
        {isOpen ? '접어두기' : '펼처보기'}
      </Button>
    </AccordionHeaderLayout>
  );
};

const AccordionHeaderLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

Accordion.Panel = ({ children }: PropsWithChildren) => {
  const { isOpen } = useAccordionContext();

  return <div>{isOpen && children}</div>;
};
