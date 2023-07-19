import {
  Children,
  ForwardedRef,
  HTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
} from 'react';
import { css, styled } from 'styled-components';
import type { CSSProp, RuleSet } from 'styled-components';

import { Size } from '@Types/style';

import useId from '@Hooks/useId';

import color from '@Styles/color';

import { SIZE } from '@Constants/style';

type Include<T, U> = T extends U ? T : never;

type LabelSizeType = Include<Size, 'x-small' | 'small' | 'medium' | 'large' | 'x-large'>;

const SIZE_TYPE: Record<LabelSizeType, RuleSet<object>> = {
  'x-small': css`
    font-size: ${SIZE['x-small']};
  `,

  small: css`
    font-size: ${SIZE.small};
  `,

  medium: css`
    font-size: ${SIZE.medium};
  `,

  large: css`
    font-size: ${SIZE.large};
  `,

  'x-large': css`
    font-size: ${SIZE['x-large']};
  `,
};

type InputProps = {
  label?: ReactNode;
  children: ReactElement;
  bottomText?: string;
  errorMessage?: string;

  $labelSize?: LabelSizeType;

  $style?: CSSProp;
};

const Input = ({
  label,
  children,
  bottomText,
  errorMessage = '잘못된 입력입니다.',
  $labelSize,
  $style,
  ...props
}: PropsWithChildren<InputProps> & HTMLAttributes<HTMLDivElement>) => {
  const child = Children.only<ReactElement<{ error: boolean; id?: string }>>(children);
  const generatedId = useId('input');
  const id = child.props.id ?? generatedId;
  const isError: boolean = child.props.error ?? false;

  return (
    <Layout {...props}>
      <StyledLabel htmlFor={id} $labelSize={$labelSize} $style={$style}>
        {label}
      </StyledLabel>
      {cloneElement(child, { id, ...child.props })}
      {isError && <StyledBottomText $error={true}>{errorMessage}</StyledBottomText>}
      {bottomText !== null && <StyledBottomText>{bottomText}</StyledBottomText>}
    </Layout>
  );
};

export default Input;

type StyledLabel = Omit<InputProps, 'label' | 'children' | 'bottomText'>;

const Layout = styled.div`
  width: 100%;
`;

const StyledLabel = styled.label<StyledLabel>`
  font-weight: 200;

  ${({ $labelSize = 'medium', $style, theme }) => css`
    color: ${theme.text};
    ${SIZE_TYPE[$labelSize]} ${$style};
  `}
`;

const StyledBottomText = styled.p<{ $error?: boolean }>`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 200;

  ${({ $error }) => css`
    color: ${$error ? color.red[600] : color.neutral[400]};
  `};
`;

type TextFieldProps = {
  error?: boolean;
  $style?: CSSProp;
} & InputHTMLAttributes<HTMLInputElement>;

Input.TextField = forwardRef(({ error, $style, ...props }: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return <StyledInput ref={ref} $style={$style} {...props} />;
});

type StyledInputProps = Pick<TextFieldProps, '$style'>;

const StyledInput = styled.input<StyledInputProps>`
  &:disabled {
    background-color: ${color.neutral[200]};
  }

  width: 100%;
  padding: 20px;
  font-size: 2.4rem;
  border-radius: 7px;
  border: 1px solid ${color.neutral[200]};
  margin-top: 10px;

  ${({ $style, theme }) => css`
    background-color: ${theme.background};
    ${$style}
  `};
`;
