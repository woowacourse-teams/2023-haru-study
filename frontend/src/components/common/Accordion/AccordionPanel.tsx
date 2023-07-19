import { PropsWithChildren } from 'react';
import { css, styled } from 'styled-components';

import { useVision } from '@Contexts/VisionContext';

import Button from '../Button/Button';

const AccordionPanel = ({ children }: PropsWithChildren) => {
  const { close } = useVision();

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
        onClick={close}
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
