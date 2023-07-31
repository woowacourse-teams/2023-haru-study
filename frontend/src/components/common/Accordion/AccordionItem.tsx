import type { PropsWithChildren, ReactElement } from 'react';
import { Children } from 'react';
import { css, styled } from 'styled-components';

import { useAccordion } from '@Components/common/Accordion/AccordionContext';

import color from '@Styles/color';

const ACCORDION_HEADER_INDEX = 0;
const ACCORDION_PANEL_INDEX = 1;

const AccordionItem = ({ children }: PropsWithChildren) => {
  const { isShow } = useAccordion();

  return (
    <AccordionItemLayout>
      {Children.map(children, (child, index) => {
        const item = child as ReactElement;

        if (index === ACCORDION_HEADER_INDEX) return item;

        if (index === ACCORDION_PANEL_INDEX && isShow) return item;

        return null;
      })}
    </AccordionItemLayout>
  );
};

export default AccordionItem;

const AccordionItemLayout = styled.li`
  padding: 10px 30px;
  border: 1px solid ${color.neutral[200]};
  border-radius: 14px;

  ${({ theme }) => css`
    background-color: ${theme.background};
    color: ${theme.text};
  `}
`;
