import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

type Props = {
  hasStudy?: boolean;
  isToday: boolean;
  isCurrentMonthDay: boolean;
  dayOfWeek: number;
} & ComponentPropsWithoutRef<'div'>;

const CalendarDay = ({
  children,
  hasStudy = false,
  isToday,
  isCurrentMonthDay,
  dayOfWeek,
  ...rest
}: PropsWithChildren<Props>) => {
  const getDayFontColor = (dayOfWeek: number) => {
    if (dayOfWeek === 0) return color.red[600];

    if (dayOfWeek === 6) return color.blue[600];

    return color.black;
  };

  return (
    <Day
      $hasStudy={hasStudy}
      $isToday={isToday}
      $isCurrentMonthDay={isCurrentMonthDay}
      $fontColor={getDayFontColor(dayOfWeek)}
      {...rest}
    >
      {children}
    </Day>
  );
};

export default CalendarDay;

type DayProps = {
  $isToday: boolean;
  $hasStudy: boolean;
  $isCurrentMonthDay: boolean;
  $fontColor: string;
};

const Day = styled.div<DayProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  width: 30px;
  height: 30px;

  ${({ $isToday, $hasStudy, $isCurrentMonthDay, $fontColor }) => css`
    background-color: ${$isToday && color.neutral[100]};
    opacity: ${$isCurrentMonthDay ? 1 : 0.4};
    color: ${$fontColor};
    cursor: ${$hasStudy && 'pointer'};
  `}

  @media screen and (max-width: 360px) {
    margin: 0 auto;
    margin-top: 5px;
  }
`;
