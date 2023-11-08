import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type Props = {
  /**
   * 달력에 데이터를 렌더링하기 위한 필수 값.
   *
   */
  date: Date;
} & ComponentPropsWithoutRef<'div'>;

const DayItemWrapper = ({ children }: PropsWithChildren<Props>) => {
  return <div>{children}</div>;
};

export default DayItemWrapper;
