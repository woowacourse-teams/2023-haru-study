import { type ReactElement } from 'react';
import { styled } from 'styled-components';

import color from '@Styles/color';

import { useCalendar } from '../CalendarContext/CalendarProvider';
import Day from '../Day/Day';

type Props = {
  data: {
    day: number;
    date: Date;
    dayOfWeek: number;
    state: 'prev' | 'cur' | 'next';
    children?: ReactElement[];
  };
};

const DayItem = ({ data }: Props) => {
  const { state, date, day, dayOfWeek, children } = data;

  const { limit, calendarDataFormat, isToday, onClickDay, onClickRestDataCount, onClickTotalDataCount } = useCalendar();

  const renderCalendarItems = limit ? children?.slice(0, limit) : children;

  return (
    <Layout>
      <DayContainer>
        <Day
          isToday={isToday(date)}
          onClick={() => onClickDay && onClickDay(date)}
          hasClick={!!onClickDay}
          isCurrentMonthDay={state === 'cur'}
          dayOfWeek={dayOfWeek}
        >
          {day}
        </Day>
        {limit && children && calendarDataFormat === 'long' && children.length - limit > 0 && (
          <RestRecords onClick={() => onClickRestDataCount && onClickRestDataCount(date)}>
            +{children.length - limit}
          </RestRecords>
        )}
      </DayContainer>
      {calendarDataFormat === 'short' && children?.length ? (
        <TotalRecordCount onClick={() => onClickTotalDataCount && onClickTotalDataCount(date)}>
          <span>{children?.length}</span>
        </TotalRecordCount>
      ) : (
        renderCalendarItems
      )}
    </Layout>
  );
};

export default DayItem;

const Layout = styled.li`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 5px;

  background-color: ${color.white};
`;

const DayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RestRecords = styled.div`
  display: flex;
  justify-content: center;

  font-size: 1.4rem;

  width: 22px;
  height: 22px;

  border-radius: 50%;
  background-color: ${color.blue[50]};

  cursor: pointer;
`;

const TotalRecordCount = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.8rem;

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 42px;
    height: 42px;

    border-radius: 50%;

    background-color: ${color.neutral[100]};

    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;

    & > span {
      width: 32px;
      height: 32px;
    }
  }
`;
