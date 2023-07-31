import type { PropsWithChildren, ReactElement } from 'react';
import { Children, cloneElement } from 'react';
import { css, styled } from 'styled-components';
import type { CSSProp } from 'styled-components';

import useDisplay from '@Hooks/common/useDisplay';
import useOutsideClick from '@Hooks/common/useOutsideClick';

import color from '@Styles/color';

import HamburgerIcon from '@Assets/icons/HamburgerIcon';

import MenuItem from './MenuItem';

const MENU_LIST_POSITION = {
  left: css`
    right: 0;
    text-align: end;
  `,
  right: css`
    left: 0;
    text-align: start;
  `,
} as const;

type Props = {
  $iconColor?: string;
  $style?: CSSProp;
  $menuListPosition?: keyof typeof MENU_LIST_POSITION;
};

const Menu = ({ $menuListPosition = 'right', $style, children, $iconColor }: PropsWithChildren<Props>) => {
  const { isShow, toggleShow, hide } = useDisplay();

  const ref = useOutsideClick<HTMLDivElement>(hide);

  return (
    <MenuLayout ref={ref} $style={$style}>
      <MenuIconWrapper onClick={toggleShow}>
        <HamburgerIcon color={$iconColor} />
      </MenuIconWrapper>
      {isShow && (
        <MenuList $menuListPosition={$menuListPosition}>
          {Children.map(children, (child) => {
            const item = child as ReactElement;
            return cloneElement(item, { hide });
          })}
        </MenuList>
      )}
    </MenuLayout>
  );
};

export default Menu;

Menu.Item = MenuItem;

type MenuLayoutProp = Pick<Props, '$style'>;

const MenuLayout = styled.div<MenuLayoutProp>`
  position: relative;

  width: fit-content;

  svg {
    cursor: pointer;
  }

  ${({ $style }) => css`
    ${$style}
  `}
`;

const MenuIconWrapper = styled.div`
  padding: 4px;
  border-radius: 50%;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${color.neutral[100]};
  }
`;

type MenuListProp = Required<Pick<Props, '$menuListPosition'>>;

const MenuList = styled.ul<MenuListProp>`
  position: absolute;
  top: 34px;

  display: grid;
  row-gap: 6px;

  width: max-content;
  max-height: 80vh;
  overflow: auto;

  padding: 10px 0px;
  border-radius: 8px;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  z-index: 10;

  ${({ $menuListPosition, theme }) => css`
    ${MENU_LIST_POSITION[$menuListPosition]}
    background-color: ${theme.background};
  `}
`;
