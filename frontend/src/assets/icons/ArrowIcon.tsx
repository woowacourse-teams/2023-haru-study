import type { ComponentPropsWithoutRef } from 'react';

type Props = {
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
} & ComponentPropsWithoutRef<'svg'>;

const ICON_DIRECTION = {
  up: 'M1 11L8 5L15 11',
  down: 'M15 5L8 11L1 5',
  left: 'M11 15L5 8L11 1',
  right: 'M5 1L11 8L5 15',
} as const;

const ArrowIcon = ({ color = 'black', direction = 'down', ...rest }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...rest}>
      <path d={ICON_DIRECTION[direction]} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ArrowIcon;
