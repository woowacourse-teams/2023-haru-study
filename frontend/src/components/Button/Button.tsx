import { CSSProp, css, styled } from 'styled-components';
import globalColor from '../../styles/color';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import CircularProgress from '../CircularProgress/CircularProgress';
import { SIZE } from '../../constants/style';
import { Size } from '../../types/style';

type Props = {
  color: 'primary' | 'secondary' | 'studying' | 'retrospect';
  size?: Size;
  isLoading?: boolean;
  $block?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
  $style?: CSSProp;
};

const Button = ({
  children,
  color,
  onClick,
  disabled,
  isLoading,
  size = 'medium',
  $block = true,
  variant = 'contained',
  $style,
}: PropsWithChildren<Props> & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton
      onClick={onClick}
      isLoading={isLoading}
      color={color}
      size={size}
      $block={$block}
      disabled={disabled}
      variant={variant}
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

  ${({ $block, $style, disabled, size = 'medium', color, variant, isLoading, theme }) => css`
    width: ${$block ? '100%' : 'auto'};

    padding: calc(${`${Number(SIZE[size].replace(/[^0-9]/g, '')) - 8}px`})
      calc(${`${Number(SIZE[size].replace(/[^0-9]/g, '')) + 20}px`});

    background-color: ${variant === 'contained' ? theme.background[color] : 'transparent'};
    border: 1px solid ${variant === 'outlined' ? theme.background[color] : 'transparent'};

    font-size: ${SIZE[size]};
    color: ${variant === 'contained'
      ? color === 'secondary'
        ? globalColor.black
        : globalColor.white
      : theme.background[color]};

    opacity: ${disabled || isLoading ? '0.4' : '1'};
    cursor: ${isLoading ? 'progress' : disabled ? 'not-allowed' : 'pointer'};

    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${variant === 'contained' && !$style
        ? theme.hoverBackground[color]
        : variant === 'outlined' && !$style
        ? globalColor.neutral[100]
        : !$style && 'transparent'};
    }

    ${$style}
  `}
`;
