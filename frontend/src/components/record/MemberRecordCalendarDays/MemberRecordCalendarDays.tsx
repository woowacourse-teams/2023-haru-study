import { css, styled } from 'styled-components';

import color from '@Styles/color';

import format from '@Utils/format';

type MonthStorage = {
  day: number;
  dayOfWeek: number;
  fullDate: string;
  state: 'prev' | 'cur' | 'next';
}[];

type Props = {
  monthStorage: MonthStorage;
};

const MemberRecordCalendarDays = ({ monthStorage }: Props) => {
  const today = new Date();

  const getDayFontColor = (dayOfWeek: number) => {
    if (dayOfWeek === 0) return color.red[600];

    if (dayOfWeek === 6) return color.blue[600];

    return color.black;
  };

  return (
    <Days $numberOfWeeks={monthStorage.length / 7}>
      {monthStorage.map(({ fullDate, state, dayOfWeek, day }) => (
        <li key={fullDate}>
          <Day
            $isCurrentMonthDay={state === 'cur'}
            $isToday={fullDate === format.date(today)}
            $fontColor={getDayFontColor(dayOfWeek)}
          >
            {day}
          </Day>
        </li>
      ))}
    </Days>
  );
};

export default MemberRecordCalendarDays;

type DaysProps = {
  $numberOfWeeks: number;
};

const Days = styled.ul<DaysProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${({ $numberOfWeeks }) => `repeat(${$numberOfWeeks}, minmax(120px, auto))`};
  gap: 1px;
  border: 1px solid ${color.neutral[200]};

  background-color: ${color.neutral[200]};

  li {
    padding: 5px;

    background-color: ${color.white};
  }
`;

type DayProps = {
  $isCurrentMonthDay: boolean;
  $isToday: boolean;
  $fontColor: string;
};

const Day = styled.div<DayProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
  border-radius: 50%;

  width: 30px;
  height: 30px;

  background-color: ${color.white};

  ${({ $isCurrentMonthDay, $fontColor, $isToday }) => css`
    opacity: ${$isCurrentMonthDay ? 1 : 0.4};
    color: ${$fontColor};

    background-color: ${$isToday && color.neutral[100]};
  `}
`;
