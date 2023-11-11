/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type Props = {
  /**
   * 달력에 데이터를 렌더링하기 위한 필수 값.
   *
   */
  date: Date;
  /**
   * Calendar Item를 클릭했을 때 호출되는 함수. 해당 Data가 위치한 Date 객체를 매개변수로 받음.
   *
   */
  onClickCalendarItem?: (date: Date) => void;
} & ComponentPropsWithoutRef<'div'>;

const CalendarItem = ({ date, onClickCalendarItem, children, ...rest }: PropsWithChildren<Props>) => {
  return (
    <div onClick={() => onClickCalendarItem && onClickCalendarItem(date)} {...rest}>
      {children}
    </div>
  );
};

export default CalendarItem;
