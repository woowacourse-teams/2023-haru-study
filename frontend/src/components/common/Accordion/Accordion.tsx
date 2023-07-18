/* eslint-disable react-hooks/rules-of-hooks */
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';
import { css, styled } from 'styled-components';
import type { CSSProp } from 'styled-components';

import color from '@Styles/color';

import Button from '../Button/Button';

type Props = {
  $style?: CSSProp;
};

const Accordion = ({ children, $style }: PropsWithChildren<Props>) => {
  return <AccordionLayout $style={$style}>{children}</AccordionLayout>;
};

export default Accordion;

const AccordionLayout = styled.div<Props>`
  display: grid;
  row-gap: 40px;

  ${({ $style }) => css`
    ${$style}
  `}
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
    <AccordionContext.Provider value={value}>
      <AccordionItemLayout>{children} </AccordionItemLayout>
    </AccordionContext.Provider>
  );
};

const AccordionItemLayout = styled.div`
  padding: 10px 30px;
  border: 1px solid ${color.neutral[200]};
  border-radius: 14px;
`;

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

  if (!isPanelOpen) return;

  return (
    <PanelLayout>
      <PanelContents>{children}</PanelContents>
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
    </PanelLayout>
  );
};

const PanelLayout = styled.div`
  display: grid;
  row-gap: 40px;
`;

const PanelContents = styled.div``;
