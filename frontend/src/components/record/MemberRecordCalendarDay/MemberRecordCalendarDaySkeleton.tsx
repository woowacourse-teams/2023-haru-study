import { styled } from 'styled-components';

import color from '@Styles/color';
import { TextSkeletonStyle } from '@Styles/common';

import format from '@Utils/format';

import type { MonthStorage } from '@Types/record';

import CalendarDay from '../CalendarDay/CalendarDay';

type Props = {
  monthStorage: MonthStorage;
};

const MemberRecordCalendarDaySkeleton = ({ monthStorage }: Props) => {
  const today = new Date();

  return monthStorage.map(({ day, date, dayOfWeek, state }, index) => (
    <Item key={index}>
      <CalendarDay
        isToday={format.date(date) === format.date(today)}
        dayOfWeek={dayOfWeek}
        isCurrentMonthDay={state === 'cur'}
      >
        {day}
      </CalendarDay>
      {Math.random() > 0.8 &&
        Array.from({ length: Math.floor(Math.random() * 4) }).map((_, index) => (
          <Skeleton key={index}>Loading</Skeleton>
        ))}
    </Item>
  ));
};

export default MemberRecordCalendarDaySkeleton;

const Item = styled.li`
  min-height: 135px;

  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 2px;

  background-color: ${color.white};
`;

const Skeleton = styled.div`
  ${TextSkeletonStyle}

  padding: 2px;
  border-radius: 4px;
`;
