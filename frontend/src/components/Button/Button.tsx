import { CSSProp, styled } from 'styled-components';
import color from '../../styles/color';
import { ButtonHTMLAttributes } from 'react';

const SIZE = {
  'x-small': '16px',
  small: '20px',
  medium: '24px',
  large: '28px',
  'x-large': '32px',
} as const;

type SIZE = keyof typeof SIZE;

type Props = {
  text: string;
  variant: 'primary' | 'secondary' | 'studying' | 'retrospect';
  size: SIZE;
  isLoading?: boolean;
  $block?: boolean;
  concept?: 'text' | 'contained' | 'outlined';
  css?: CSSProp;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const LoadingSpinner = () => {
  return (
    <StyledLoadingSinner>
      <span>Loading</span>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledLoadingSinner>
  );
};

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
      {isLoading ? <LoadingSpinner /> : text}
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

const StyledLoadingSinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: transparent;
  }

  div {
    position: absolute;
    width: 24px;
    height: 24px;
    border: 2px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
