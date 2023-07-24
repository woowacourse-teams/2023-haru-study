import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

import { useAccordion } from '@Components/common/Accordion/AccordionContext';

import Button from '../Button/Button';

const AccordionHeader = ({ children }: PropsWithChildren) => {
  const { isShow, show } = useAccordion();

  return (
    <AccordionHeaderLayout>
      {children}
      {!isShow && (
        <Button variant="secondary" size="x-small" onClick={show}>
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
