import { CSSProp, css, styled } from 'styled-components';
import color from '../../styles/color';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import CircularProgress from '../CircularProgress/CircularProgress';
import { SIZE } from '../../constants/style';
import { Size } from '../../types/style';

type Props = {
  variant: 'primary' | 'secondary' | 'studying' | 'retrospect';
  size?: Size;
  isLoading?: boolean;
  $block?: boolean;
  concept?: 'text' | 'contained' | 'outlined';
  $style?: CSSProp;
};

const Button = ({
  children,
  variant,
  onClick,
  disabled,
  isLoading,
  size = 'medium',
  $block = true,
  concept = 'contained',
  $style,
}: PropsWithChildren<Props> & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton
      onClick={onClick}
      isLoading={isLoading}
      variant={variant}
      size={size}
      $block={$block}
      disabled={disabled}
      concept={concept}
      $style={$style}
    >
      {isLoading ? <CircularProgress size={size} /> : children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<Props>`
  position: relative;

  border-radius: 14px;

  ${({ $block, $style, disabled, size = 'medium', variant, concept, isLoading, theme }) => css`
    width: ${$block ? '100%' : 'auto'};

    padding: calc(${`${Number(SIZE[size].replace(/[^0-9]/g, '')) - 8}px`})
      calc(${`${Number(SIZE[size].replace(/[^0-9]/g, '')) + 20}px`});

    background-color: ${concept === 'contained' ? theme.background[variant] : 'transparent'};
    border: 1px solid ${concept === 'outlined' ? theme.background[variant] : 'transparent'};

    font-size: ${SIZE[size]};
    color: ${concept === 'contained'
      ? variant === 'secondary'
        ? color.black
        : color.white
      : theme.background[variant]};

    opacity: ${disabled || isLoading ? '0.4' : '1'};
    cursor: ${isLoading ? 'progress' : disabled ? 'not-allowed' : 'pointer'};

    ${$style}
  `}
`;
