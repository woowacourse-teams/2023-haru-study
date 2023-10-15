import { useState } from 'react';
import { css, keyframes, styled } from 'styled-components';

import color from '@Styles/color';

import ResetIcon from '@Assets/icons/ResetIcon';

type Props = {
  onClick: () => void;
  diameter?: number;
};

const RefreshButton = ({ onClick, diameter = 30 }: Props) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    onClick();

    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  return (
    <Layout onClick={handleClick} role="presentation" $rotateAnimation={isRotating} diameter={diameter}>
      <ResetIcon color={color.neutral[500]} />
    </Layout>
  );
};

export default RefreshButton;

const Rotation = keyframes`
  0% {
    transform:rotate(0deg);
  }
  100%{
    transform:rotate(-360deg);
  }
`;

const Layout = styled.div<{
  $rotateAnimation: boolean;
  diameter: number;
}>`
  transition: background-color 0.2s ease;

  svg {
    width: ${({ diameter }) => `${diameter}px`};
    height: ${({ diameter }) => `${diameter}px`};

    transition: transform 1s ease;
  }

  ${({ $rotateAnimation }) =>
    $rotateAnimation &&
    css`
      animation: ${Rotation} 1s ease forwards;
      cursor: default;
    `}

  cursor: pointer;
`;
