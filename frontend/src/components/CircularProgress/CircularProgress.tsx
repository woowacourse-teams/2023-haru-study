import { CSSProp, styled } from 'styled-components';
import { Size } from '../../types/style';
import { SIZE } from '../../constants/style';
import color from '../../styles/color';

type Props = {
  size: Size;
  $style?: CSSProp;
};

const CircularProgress = ({ size, $style }: Props) => {
  return (
    <StyledCircularProgress size={size} $style={$style}>
      <LoadingText>Loading</LoadingText>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledCircularProgress>
  );
};

export default CircularProgress;

const StyledCircularProgress = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    position: absolute;
    width: ${(props) => SIZE[props.size]};
    height: ${(props) => SIZE[props.size]};
    border: 2px solid ${color.white};
    border-radius: 50%;
    animation: loading-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${color.white} transparent transparent transparent;

    ${(props) => props.$style}
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

const LoadingText = styled.span`
  color: transparent;
`;
