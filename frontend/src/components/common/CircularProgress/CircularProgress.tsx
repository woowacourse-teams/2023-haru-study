import { css, styled } from 'styled-components';
import type { CSSProp } from 'styled-components';

import color from '@Styles/color';

import { SIZE } from '@Constants/style';

import type { Size } from '@Types/style';

type Props = {
  size?: Size;
  circleColor?: string;
  $style?: CSSProp;
};

const CircularProgress = ({ size = 'medium', circleColor = color.white, $style }: Props) => {
  return (
    <StyledCircularProgress size={size} $style={$style} $circleColor={circleColor}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledCircularProgress>
  );
};

export default CircularProgress;

type StyledCircularProgressProps = {
  size?: Size;
  $circleColor?: string;
  $style?: CSSProp;
};

const StyledCircularProgress = styled.div<StyledCircularProgressProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    position: absolute;
    border-radius: 50%;
    animation: loading-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

    ${({ size = 'medium', $circleColor, $style }) => css`
      width: ${SIZE[size]};
      height: ${SIZE[size]};

      border: 2px solid ${$circleColor};
      border-color: ${$circleColor} transparent transparent transparent;

      ${$style}
    `}
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

  @keyframes loading-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
