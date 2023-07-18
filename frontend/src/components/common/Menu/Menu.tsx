import { LiHTMLAttributes, PropsWithChildren } from 'react';
import { styled } from 'styled-components';

import color from '@Styles/color';

import HamburgerIcon from '@Assets/icons/HamburgerIcon';

const Menu = ({ children }: PropsWithChildren) => {
  return (
    <MenuLayout>
      <HamburgerIcon />
      <MenuList>{children}</MenuList>
    </MenuLayout>
  );
};

export default Menu;

const MenuLayout = styled.div`
  position: relative;

  svg {
    cursor: pointer;
  }
`;

const MenuList = styled.ul`
  position: absolute;
  top: 30px;

  display: grid;
  row-gap: 6px;

  width: fit-content;

  padding: 10px 0px;
  border-radius: 8px;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const MenuItem = ({ children, onClick }: PropsWithChildren<LiHTMLAttributes<HTMLLIElement>>) => {
  return <MenuItemLayout onClick={onClick}>{children}</MenuItemLayout>;
};

const MenuItemLayout = styled.li`
  padding: 6px 24px;

  transition: background-color 0.2s ease;

  cursor: pointer;

  &:hover {
    background-color: ${color.neutral[100]};
  }
`;

Menu.Item = MenuItem;
