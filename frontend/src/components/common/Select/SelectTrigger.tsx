import { ButtonHTMLAttributes } from 'react';
import { CSSProp, css, styled } from 'styled-components';

import color from '@Styles/color';

import { useSelectContext } from './SelectContext';

type Props = {
  triggerText?: string;

  $style?: CSSProp;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SelectTrigger = ({ triggerText = '선택', ...props }: Props) => {
  const { isOpen, selectedItem, toggleOpen, triggerSuffixText } = useSelectContext();

  return (
    <Layout {...props} onClick={toggleOpen}>
      {selectedItem === null ? triggerText : selectedItem.toString() + triggerSuffixText}
      {isOpen ? <Mark>&#9650;</Mark> : <Mark>&#9660;</Mark>}
    </Layout>
  );
};

export default SelectTrigger;

const Layout = styled.button<Props>`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 20px;
  font-size: 2rem;
  border-radius: 7px;
  border: 1px solid ${color.neutral[200]};
  margin-top: 10px;

  ${({ $style, theme }) => css`
    background-color: ${theme.background};
    ${$style}
  `};
`;

const Mark = styled.p`
  padding-top: 5px;
  font-size: 1.4rem;
`;
