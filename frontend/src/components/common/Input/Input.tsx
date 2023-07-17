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
import { CSSProp, RuleSet, css, styled } from 'styled-components';
import useId from '../../../hooks/useId';
import colorStyle from '../../../styles/color';
import { Size } from '../../../types/style';
import { SIZE } from '../../../constants/style';

type Include<T, U> = T extends U ? T : never;

type LabelSizeType = Include<Size, 'x-small' | 'small' | 'medium' | 'large' | 'x-large'>;

const SIZE_TYPE: Record<LabelSizeType, RuleSet<object>> = {
  'x-small': css`
    font-size: ${SIZE['x-small']};
  `,

  small: css`
    font-size: ${SIZE['small']};
  `,

  medium: css`
    font-size: ${SIZE['medium']};
  `,

  large: css`
    font-size: ${SIZE['large']};
  `,

  'x-large': css`
    font-size: ${SIZE['x-large']};
  `,
};

type InputProps = {
  label?: ReactNode;
  children: ReactElement;
  bottomText?: string;

  $labelSize?: LabelSizeType;

  $style?: CSSProp;
};

const Input = ({
  label,
  children,
  bottomText,
  $labelSize,
  $style,
  ...props
}: PropsWithChildren<InputProps> & HTMLAttributes<HTMLDivElement>) => {
  const child = Children.only(children);
  const generatedId = useId('input');
  const id = child.props.id ?? generatedId;
  const isError: boolean = child.props.error ?? false;

  return (
    <Layout {...props}>
      <StyledLabel htmlFor={id} $labelSize="medium" $style={$style}>
        {label}
      </StyledLabel>
      {cloneElement(child, { id, ...child.props })}
      {isError && <StyledBottomText isError={true}>잘못된 입력입니다.</StyledBottomText>}
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

const StyledBottomText = styled.p<{ isError?: boolean }>`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 200;

  ${({ isError }) => css`
    color: ${isError ? colorStyle.red[600] : colorStyle.neutral[400]};
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
    background-color: ${colorStyle.neutral[200]};
  }

  width: 100%;
  padding: 20px;
  font-size: 2.4rem;
  border-radius: 7px;
  border: 1px solid ${colorStyle.neutral[200]};

  ${({ $style, theme }) => css`
    background-color: ${theme.background};
    ${$style}
  `};
`;
