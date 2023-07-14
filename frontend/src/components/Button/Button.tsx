import { CSSProp, css, styled } from 'styled-components';
import color from '../../styles/color';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import CircularProgress from '../CircularProgress/CircularProgress';
import { SIZE } from '../../constants/style';
import { Size } from '../../types/style';

const extractAndConvertNumbersFromText = (string: string) => Number(string.replace(/[^0-9]/g, ''));

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

  dander: css`
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
        background-color: ${color.white};
      }
    }
  `,
} as const;

type Variant = keyof typeof VARIANT_TYPE;

type Props = {
  variant: Variant;
  size?: Size;
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
}: PropsWithChildren<Props> & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      isLoading={isLoading}
      size={size}
      $block={$block}
      disabled={disabled}
      $style={$style}
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

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${({ $block, $style, size = 'medium', variant }) => css`
    ${VARIANT_TYPE[variant]}

    width: ${$block ? '100%' : 'auto'};

    padding: calc(${`${extractAndConvertNumbersFromText(SIZE[size]) - 8}px`})
      calc(${`${extractAndConvertNumbersFromText(SIZE[size]) + 20}px`});

    font-size: ${SIZE[size]};

    cursor: pointer;

    transition: background-color 0.2s ease;

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
