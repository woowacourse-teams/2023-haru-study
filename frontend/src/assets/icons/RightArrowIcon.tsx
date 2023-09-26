import type { ComponentPropsWithoutRef } from 'react';

type Props = {
  color?: string;
} & ComponentPropsWithoutRef<'svg'>;

function RightArrow({ color = '#000000', ...rest }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...rest}>
      <path d="M5 1L11 8L5 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default RightArrow;
