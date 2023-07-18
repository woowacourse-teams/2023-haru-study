/* eslint-disable react-hooks/rules-of-hooks */
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';
import { css, styled } from 'styled-components';

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
  isPanelOpen: false,
  openPanel: () => {},
  closePanel: () => {},
});

const useAccordionContext = () => useContext(AccordionContext);

Accordion.Item = ({ children }: PropsWithChildren) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  const value = useMemo(() => ({ isPanelOpen, openPanel, closePanel }), [isPanelOpen]);

  return (
    <div>
      <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>
    </div>
  );
};

Accordion.Header = ({ children }: PropsWithChildren) => {
  const { isPanelOpen, openPanel } = useAccordionContext();

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

const AccordionHeaderLayout = styled.div`
  min-height: 50px;

  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

Accordion.Panel = ({ children }: PropsWithChildren) => {
  const { isPanelOpen, closePanel } = useAccordionContext();

  return (
    <PanelLayout>
      {isPanelOpen && <PanelContents>{children}</PanelContents>}
      {isPanelOpen && (
        <Button
          variant="secondary"
          size="x-small"
          $block={false}
          $style={css`
            justify-self: end;
          `}
          onClick={closePanel}
        >
          접어두기
        </Button>
      )}
    </PanelLayout>
  );
};

const PanelLayout = styled.div`
  display: grid;
  row-gap: 40px;
`;

const PanelContents = styled.div``;
