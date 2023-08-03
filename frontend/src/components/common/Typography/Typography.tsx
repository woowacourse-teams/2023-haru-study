import type { HTMLAttributes, PropsWithChildren } from 'react';
import { css, styled } from 'styled-components';
import type { CSSProp } from 'styled-components';

import colorStyle from '@Styles/color';

type Props = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p1' | 'p2';

  fontSize?: string;
  fontWeight?: string;
  color?: string;

  $style?: CSSProp;
} & HTMLAttributes<HTMLHeadingElement>;

const TAG_MAPPING = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p1: 'p',
  p2: 'p',
};

const FONT_STYLE = {
  fontSize: {
    h1: '4.8rem',
    h2: '4rem',
    h3: '3.6rem',
    h4: '3.2rem',
    h5: '2.4rem',
    h6: '2rem',
    p1: '2.4rem',
    p2: '1.6rem',
  },
  fontWeight: {
    h1: 700,
    h2: 700,
    h3: 700,
    h4: 500,
    h5: 500,
    h6: 500,
    p1: 300,
    p2: 300,
  },
} as const;

const Typography = ({ variant, fontSize, fontWeight, color, $style, children, ...props }: PropsWithChildren<Props>) => {
  return (
    <StyledTypography
      as={TAG_MAPPING[variant]}
      variant={variant}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      $style={$style}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

const StyledTypography = styled.div<Props>`
  ${({ variant, fontSize, fontWeight, color, $style }) => css`
    font-size: ${fontSize || FONT_STYLE.fontSize[variant]};
    font-weight: ${fontWeight || FONT_STYLE.fontWeight[variant]};
    color: ${color || colorStyle.black};

    ${$style};
  `};
`;

export default Typography;
