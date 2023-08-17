import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { css, styled } from 'styled-components';
import type { CSSProp, RuleSet } from 'styled-components';

import color from '@Styles/color';

import { SIZE } from '@Constants/style';

import type { Size } from '@Types/style';

import CircularProgress from '../CircularProgress/CircularProgress';

type Include<T, U> = T extends U ? T : never;

type ButtonSizeType = Include<Size, 'x-small' | 'small' | 'medium' | 'large' | 'x-large'>;

const SIZE_TYPE: Record<ButtonSizeType, RuleSet<object>> = {
  'x-small': css`
    padding: 8px 20px;
    font-size: ${SIZE['x-small']};
    border-radius: 7px;
  `,

  small: css`
    padding: 12px 24px;
    font-size: ${SIZE.small};
    border-radius: 7px;
  `,

  medium: css`
    padding: 16px 32px;
    font-size: ${SIZE.medium};
  `,

  large: css`
    padding: 20px 48px;
    font-size: ${SIZE.large};
  `,

  'x-large': css`
    padding: 24px 60px;
    font-size: ${SIZE['x-large']};
  `,
};

const VARIANT_TYPE = {
  primary: css`
    background-color: ${color.blue[500]};
    color: ${color.white};
    border: 1px solid transparent;
    &:hover {
      &:enabled {
        background-color: ${color.blue[600]};
      }
    }
  `,

  secondary: css`
    background-color: ${color.neutral[100]};
    color: ${color.neutral[950]};
    border: 1px solid transparent;
    &:hover {
      &:enabled {
        background-color: ${color.neutral[200]};
      }
    }
  `,

  success: css`
    background-color: ${color.teal[500]};
    color: ${color.white};
    border: 1px solid transparent;
    &:hover {
      &:enabled {
        background-color: ${color.teal[600]};
      }
    }
  `,

  danger: css`
    background-color: ${color.red[500]};
    color: ${color.white};
    border: 1px solid transparent;
    &:hover {
      &:enabled {
        background-color: ${color.red[600]};
      }
    }
  `,

  outlined: css`
    background-color: ${color.white};
    color: ${color.blue[500]};
    border: 1px solid ${color.blue[500]};
    &:hover {
      &:enabled {
        background-color: ${color.neutral[100]};
      }
    }
  `,
} as const;

type Props = {
  variant: keyof typeof VARIANT_TYPE;
  size?: ButtonSizeType;
  isLoading?: boolean;
  $block?: boolean;
  $style?: CSSProp;
};

const Button = ({
  variant,
  children,
  onClick,
  disabled,
  isLoading,
  size = 'medium',
  $block = true,
  $style,
  ...props
}: PropsWithChildren<Props> & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      isLoading={isLoading}
      size={size}
      disabled={disabled}
      $block={$block}
      $style={$style}
      {...props}
    >
      {isLoading && (
        <CircularProgressLayout>
          <CircularProgress size={size} />
        </CircularProgressLayout>
      )}
      <ButtonText isLoading={isLoading}>{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<Props>`
  position: relative;

  border-radius: 14px;

  transition: background-color 0.2s ease;

  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${({ $block, $style, size = 'medium', variant }) => css`
    ${VARIANT_TYPE[variant]}
    ${SIZE_TYPE[size]}

    width: ${$block ? '100%' : 'fit-content'};

    ${$style}
  `}
`;

type ButtonTextProps = Pick<Props, 'isLoading'>;

const ButtonText = styled.p<ButtonTextProps>`
  ${({ isLoading }) => css`
    color: ${isLoading && 'transparent'};
  `}
`;

const CircularProgressLayout = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;
