import type { ComponentPropsWithoutRef } from 'react';

type Props = {
  color?: string;
} & ComponentPropsWithoutRef<'svg'>;

function LeftArrow({ color = '#000000', ...rest }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...rest}>
      <path d="M11 15L5 8L11 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default LeftArrow;
