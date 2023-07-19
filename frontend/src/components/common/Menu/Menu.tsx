import React, {
  Children,
  LiHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { styled } from 'styled-components';

import color from '@Styles/color';

import HamburgerIcon from '@Assets/icons/HamburgerIcon';

const Menu = ({ children }: PropsWithChildren) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpenMenu((prev) => !prev);

  const closeMenu = () => setIsOpenMenu(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <MenuLayout ref={ref}>
      <MenuIconWrapper onClick={toggleMenu}>
        <HamburgerIcon />
      </MenuIconWrapper>
      {isOpenMenu && (
        <MenuList>
          {Children.map(children, (child) => {
            const item = child as ReactElement;
            return cloneElement(item, { closeMenu });
          })}
        </MenuList>
      )}
    </MenuLayout>
  );
};

export default Menu;

const MenuLayout = styled.div`
  position: relative;

  width: fit-content;

  svg {
    cursor: pointer;
  }
`;

const MenuIconWrapper = styled.div``;

const MenuList = styled.ul`
  position: absolute;
  top: 30px;

  display: grid;
  row-gap: 6px;

  width: max-content;

  padding: 10px 0px;
  border-radius: 8px;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

type MenuItemProps = PropsWithChildren<{ closeMenu?: () => void; onClick: () => void }> &
  LiHTMLAttributes<HTMLLIElement>;

const MenuItem = ({ children, onClick, closeMenu, ...props }: MenuItemProps) => {
  const handleClick = () => {
    if (closeMenu) closeMenu();
    onClick();
  };

  return (
    <MenuItemLayout onClick={handleClick} {...props}>
      {children}
    </MenuItemLayout>
  );
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
