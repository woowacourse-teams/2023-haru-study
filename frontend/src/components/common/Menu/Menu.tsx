import { LiHTMLAttributes, PropsWithChildren } from 'react';
import { styled } from 'styled-components';

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

const MenuLayout = styled.div``;

const MenuList = styled.ul``;

const MenuItem = ({ children, onClick }: PropsWithChildren<LiHTMLAttributes<HTMLLIElement>>) => {
  return <MenuItemLayout onClick={onClick}>{children}</MenuItemLayout>;
};

const MenuItemLayout = styled.li``;

Menu.Item = MenuItem;
