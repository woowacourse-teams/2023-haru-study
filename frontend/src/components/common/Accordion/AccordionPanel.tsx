import { PropsWithChildren } from 'react';
import { css, styled } from 'styled-components';

import { useAccordion } from './AccordionContext';
import Button from '../Button/Button';

const AccordionPanel = ({ children }: PropsWithChildren) => {
  const { closePanel } = useAccordion();

  return (
    <PanelLayout>
      <div>{children}</div>
      <Button
        variant="secondary"
        size="x-small"
        $block={false}
        $style={css`
          justify-self: end;
          align-self: flex-end;
        `}
        onClick={closePanel}
      >
        접어두기
      </Button>
    </PanelLayout>
  );
};

export default AccordionPanel;

const PanelLayout = styled.div`
  display: grid;
  row-gap: 40px;

  margin-bottom: 10px;
`;
