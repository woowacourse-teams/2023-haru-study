import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

import { useVision } from '@Contexts/VisionContext';

import Button from '../Button/Button';

const AccordionHeader = ({ children }: PropsWithChildren) => {
  const { isOpen, open } = useVision();

  return (
    <AccordionHeaderLayout>
      {children}
      {!isOpen && (
        <Button variant="secondary" size="x-small" onClick={open}>
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
