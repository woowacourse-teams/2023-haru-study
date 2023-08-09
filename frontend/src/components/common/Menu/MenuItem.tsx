import type { LiHTMLAttributes, PropsWithChildren } from 'react';
import { styled } from 'styled-components';

import color from '@Styles/color';

type Props = {
  bottomSeparator?: boolean;
  hide?: () => void;
  onClick: () => void;
};

const MenuItem = ({
  bottomSeparator,
  children,
  onClick,
  hide,
  ...props
}: PropsWithChildren<Props> & LiHTMLAttributes<HTMLLIElement>) => {
  const handleClick = () => {
    if (hide) hide();
    onClick();
  };

  return (
    <>
      <MenuItemLayout onClick={handleClick} {...props}>
        {children}
      </MenuItemLayout>
      {bottomSeparator && <Separator />}
    </>
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

const Separator = styled.div`
  height: 1.5px;
  background-color: ${color.neutral[100]};
`;
