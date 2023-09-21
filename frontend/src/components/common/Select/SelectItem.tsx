import type { HTMLAttributes } from 'react';
import { useEffect } from 'react';
import type { CSSProp } from 'styled-components';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

import { useSelectContext } from './SelectContext';

export type ItemProps = {
  value: string | number;
  suffix: string;

  $style?: CSSProp;
} & HTMLAttributes<HTMLDivElement>;

const SelectItem = ({ value, suffix, ...props }: ItemProps) => {
  const { changeTriggerSuffixText } = useSelectContext();

  useEffect(() => {
    changeTriggerSuffixText(suffix);
  }, [suffix, changeTriggerSuffixText]);

  return (
    <Layout {...props} data-value={value}>
      {value}
      {suffix}
    </Layout>
  );
};

export default SelectItem;

const Layout = styled.div<Omit<ItemProps, 'value' | 'suffix'>>`
  &:hover {
    background-color: ${color.neutral[200]};
  }

  display: flex;

  width: 100%;
  padding: 20px;
  font-size: 2rem;
  border: 1px solid ${color.neutral[200]};
  border-bottom: none;
  cursor: pointer;

  ${({ $style, theme }) => css`
    background-color: ${theme.background};
    ${$style}
  `};

  @media screen and (max-width: 768px) {
    font-size: 1.8rem;
    padding: 14px;
  }
`;
