import { css, styled } from 'styled-components';

import color from '@Styles/color';

import LeftArrow from '@Assets/icons/LeftArrowIcon';
import RightArrow from '@Assets/icons/RightArrowIcon';

type Props = {
  position: 'left' | 'right';
  moveScroll: () => void;
};

const TabListScrollButton = ({ position, moveScroll }: Props) => {
  return (
    <ScrollButton position={position}>
      <div>
        {position === 'left' ? (
          <LeftArrow color={color.neutral[500]} onClick={moveScroll} />
        ) : (
          <RightArrow color={color.neutral[500]} onClick={moveScroll} />
        )}
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
    display: flex;
    align-items: center;
    width: 20px;
    height: 105%;
  }

  svg {
    width: 16px;
    height: 16px;

    cursor: pointer;
  }

  ${({ position }) => css`
    ${SCROLL_BUTTON_STYLE[position]}
  `}
`;
