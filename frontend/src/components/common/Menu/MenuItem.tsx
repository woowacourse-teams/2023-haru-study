import { LiHTMLAttributes, PropsWithChildren } from 'react';
import { styled } from 'styled-components';

import color from '@Styles/color';

type Props = {
  closeMenu?: () => void;
  onClick: () => void;
};

const MenuItem = ({
  children,
  onClick,
  closeMenu,
  ...props
}: PropsWithChildren<Props> & LiHTMLAttributes<HTMLLIElement>) => {
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

export default MenuItem;

const MenuItemLayout = styled.li`
  padding: 6px 24px;

  transition: background-color 0.2s ease;

  cursor: pointer;

  &:hover {
    background-color: ${color.neutral[100]};
  }
`;
