import { Children, PropsWithChildren, ReactElement } from 'react';
import { css, styled } from 'styled-components';
import type { CSSProp } from 'styled-components';

import { AccordionProvider } from './AccordionContext';
import AccordionHeader from './AccordionHeader';
import AccordionItem from './AccordionItem';
import AccordionPanel from './AccordionPanel';

type Props = {
  $style?: CSSProp;
};

const Accordion = ({ children, $style }: PropsWithChildren<Props>) => {
  return (
    <AccordionLayout $style={$style}>
      {Children.map(children, (child) => {
        return <AccordionProvider>{child as ReactElement}</AccordionProvider>;
      })}
    </AccordionLayout>
  );
};

export default Accordion;

Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;
Accordion.Item = AccordionItem;

const AccordionLayout = styled.div<Props>`
  display: grid;
  row-gap: 40px;

  height: fit-content;

  ${({ $style }) => css`
    ${$style}
  `}
`;
