import { CSSProp, styled } from 'styled-components';
import color from '../../styles/color';
import { ButtonHTMLAttributes } from 'react';
import CircularProgress from '../CircularProgress/CircularProgress';
import { SIZE } from '../../constants/style';
import { Size } from '../../types/style';

type Props = {
  text: string;
  variant: 'primary' | 'secondary' | 'studying' | 'retrospect';
  size: Size;
  isLoading?: boolean;
  $block?: boolean;
  concept?: 'text' | 'contained' | 'outlined';
  css?: CSSProp;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  text,
  variant,
  size,
  onClick,
  disabled,
  isLoading,
  $block = true,
  concept = 'contained',
  css,
}: Props) => {
  return (
    <StyledButton
      onClick={onClick}
      isLoading={isLoading}
      variant={variant}
      size={size}
      $block={$block}
      disabled={disabled}
      concept={concept}
      css={css}
    >
      {isLoading ? <CircularProgress size={size} /> : text}
    </StyledButton>
  );
};

export default Button;

type StyledButtonProps = Omit<Props, 'text' | 'handleClick'>;

const StyledButton = styled.button<StyledButtonProps>`
  position: relative;

  width: ${(props) => (props.$block ? '100%' : 'auto')};

  padding: calc(${(props) => `${Number(SIZE[props.size].replace(/[^0-9]/g, '')) - 8}px`})
    calc(${(props) => `${Number(SIZE[props.size].replace(/[^0-9]/g, '')) + 20}px`});
  border-radius: 14px;

  background-color: ${(props) =>
    props.concept === 'contained' ? props.theme.background[props.variant] : 'transparent'};
  border: 1px solid ${(props) => (props.concept === 'outlined' ? props.theme.background[props.variant] : 'transparent')};

  font-size: ${(props) => SIZE[props.size]};
  color: ${(props) =>
    props.concept === 'contained'
      ? props.variant === 'secondary'
        ? color.black
        : color.white
      : props.theme.background[props.variant]};

  opacity: ${(props) => (props.disabled || props.isLoading ? '0.4' : '1')};
  cursor: ${(props) => (props.isLoading ? 'progress' : props.disabled ? 'not-allowed' : 'pointer')};

  ${(props) => props.css}
`;
