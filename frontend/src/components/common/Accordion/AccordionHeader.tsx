import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

import { useAccordion } from './AccordionContext';
import Button from '../Button/Button';

const AccordionHeader = ({ children }: PropsWithChildren) => {
  const { isPanelOpen, openPanel } = useAccordion();

  return (
    <AccordionHeaderLayout>
      {children}
      {!isPanelOpen && (
        <Button variant="secondary" size="x-small" onClick={openPanel}>
          펼처보기
        </Button>
      )}
    </AccordionHeaderLayout>
  );
};

export default AccordionHeader;

const AccordionHeaderLayout = styled.div`
  min-height: 50px;

  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;
