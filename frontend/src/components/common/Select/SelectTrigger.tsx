import type { ButtonHTMLAttributes } from 'react';
import type { CSSProp } from 'styled-components';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

import { useSelectContext } from './SelectContext';

type Props = {
  triggerText?: string;
  testId?: string;

  $style?: CSSProp;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SelectTrigger = ({ triggerText = '선택', testId, ...props }: Props) => {
  const { isOpen, selectedItem, toggleOpen, triggerSuffixText } = useSelectContext();

  return (
    <Layout {...props} $isOpen={isOpen} onClick={toggleOpen} data-testid={testId}>
      {selectedItem === null ? triggerText : selectedItem.toString() + triggerSuffixText}
      {isOpen ? <Mark>&#9650;</Mark> : <Mark>&#9660;</Mark>}
    </Layout>
  );
};

export default SelectTrigger;

const Layout = styled.button<Props & { $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 20px;
  font-size: 2rem;
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  border: 1px solid ${color.neutral[200]};
  margin-top: 10px;

  ${({ $style, theme, $isOpen }) => css`
    background-color: ${theme.background};
    border-bottom-right-radius: ${$isOpen ? 'none' : '7px'};
    border-bottom-left-radius: ${$isOpen ? 'none' : '7px'};
    ${$style}
  `};
`;

const Mark = styled.p`
  padding-top: 5px;
  font-size: 1.4rem;
`;
