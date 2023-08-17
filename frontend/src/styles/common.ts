import { css, keyframes } from 'styled-components';

const SkeletonAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const TextSkeletonStyle = css`
  color: transparent;

  border-radius: 14px;

  background: linear-gradient(-90deg, #dee2e6, #f0f0f0, #dee2e6, #f0f0f0);
  background-size: 400%;

  animation: ${SkeletonAnimation} 5s infinite ease-in-out;
`;

export const DefaultSkeletonStyle = css`
  color: transparent;

  background: linear-gradient(-90deg, #dee2e6, #f0f0f0, #dee2e6, #f0f0f0);
  background-size: 400%;

  animation: ${SkeletonAnimation} 5s infinite ease-in-out;
`;
