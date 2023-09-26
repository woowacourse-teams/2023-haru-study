import { css, styled } from 'styled-components';

import color from '@Styles/color';

import ArrowIcon from '@Assets/icons/ArrowIcon';

type Props = {
  position: 'left' | 'right';
  moveScroll: () => void;
};

const TabListScrollButton = ({ position, moveScroll }: Props) => {
  return (
    <ScrollButton position={position}>
      <div>
        <ArrowIcon direction={position} color={color.neutral[500]} onClick={moveScroll} />
      </div>
    </ScrollButton>
  );
};

export default TabListScrollButton;

type ScrollButtonProps = {
  position: 'left' | 'right';
};

const SCROLL_BUTTON_STYLE = {
  left: css`
    left: -5px;

    & > div {
      justify-content: flex-start;
      background: linear-gradient(to left, #ffffffc5, #ffffff);
    }
  `,
  right: css`
    right: -5px;

    & > div {
      justify-content: flex-end;
      background: linear-gradient(to right, #ffffffc5, #ffffff);
    }
  `,
} as const;

const ScrollButton = styled.div<ScrollButtonProps>`
  position: absolute;
  top: 0;
  height: 100%;

  padding-bottom: 5px;
  border-bottom: 2px solid transparent;

  z-index: 5;

  & > div {
    width: 24px;
    display: flex;
    align-items: center;
    height: 105%;
  }

  svg {
    cursor: pointer;
  }

  ${({ position }) => css`
    ${SCROLL_BUTTON_STYLE[position]}
  `}
`;
