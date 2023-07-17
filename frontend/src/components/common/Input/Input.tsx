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
import { CSSProp, css, styled } from 'styled-components';

import useId from '../../../hooks/useId';
import colorStyle from '../../../styles/color';

const LABEL_STYLE = {
  fontSize: {
    default: '24px',
  },
  fontWeight: {
    default: '200',
  },
  color: {
    default: colorStyle.black,
  },
} as const;

type InputProps = {
  label?: ReactNode;
  children: ReactElement;
  bottomText?: string;

  variant: 'default';

  fontSize?: string;
  fontWeight?: string;
  color?: string;

  $style?: CSSProp;
};

const Input = ({
  label,
  children,
  bottomText,
  variant,
  fontSize,
  fontWeight,
  color,
  $style,
  ...props
}: PropsWithChildren<InputProps> & HTMLAttributes<HTMLDivElement>) => {
  const child = Children.only(children);
  const generatedId = useId('input');
  const id = child.props.id ?? generatedId;
  const isError: boolean = child.props.error ?? false;

  return (
    <Layout {...props}>
      <StyledLabel htmlFor={id} variant={variant} $style={$style}>
        {label}
      </StyledLabel>
      {cloneElement(child, { id, ...child.props })}
      {isError && <StyledBottomText isError={true}>잘못된 입력입니다.</StyledBottomText>}
      {bottomText !== null ? <StyledBottomText>{bottomText}</StyledBottomText> : null}
    </Layout>
  );
};

export default Input;

type StyledLabel = Omit<InputProps, 'label' | 'children' | 'bottomText'>;

const Layout = styled.div`
  width: 100%;
`;

const StyledLabel = styled.label<StyledLabel>`
  ${({ variant, fontSize, fontWeight, color, $style }) => css`
    font-size: ${fontSize || LABEL_STYLE.fontSize[variant]};
    font-weight: ${fontWeight || LABEL_STYLE.fontWeight[variant]};
    color: ${color || LABEL_STYLE.color[variant]};

    ${$style}
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
  height: 70px;
  padding: 27px 20px;
  font-size: 24px;
  border-radius: 7px;
  border: 1px solid ${colorStyle.neutral[200]};
  background-color: ${colorStyle.white};

  ${({ $style }) => css`
    ${$style}
  `};
`;
