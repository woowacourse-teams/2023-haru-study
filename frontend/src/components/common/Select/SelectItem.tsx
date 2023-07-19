import { HTMLAttributes } from 'react';
import { CSSProp, css, styled } from 'styled-components';

import color from '@Styles/color';

export type ItemProps = {
  value: string;

  $style?: CSSProp;
} & HTMLAttributes<HTMLDivElement>;

const SelectItem = ({ value, ...props }: ItemProps) => {
  return (
    <Layout {...props} data-value={value}>
      {value}
    </Layout>
  );
};

export default SelectItem;

const Layout = styled.div<Omit<ItemProps, 'value'>>`
  &:hover {
    background-color: ${color.neutral[200]};
  }

  display: flex;

  width: 100%;
  padding: 20px;
  font-size: 2rem;
  border: 1px solid ${color.neutral[200]};
  border-top: none;
  cursor: pointer;

  ${({ $style, theme }) => css`
    background-color: ${theme.background};
    ${$style}
  `};
`;
