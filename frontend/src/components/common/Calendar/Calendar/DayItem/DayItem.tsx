import { useState, type PropsWithChildren, type ReactElement, useEffect } from 'react';
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
  };
};

const DayItem = ({ data }: PropsWithChildren<Props>) => {
  const { state, date, day, dayOfWeek } = data;
  const { getCalendarDayChildren, isToday } = useCalendar();

  const [calendarDayChildrenProps, setCalendarDayChildrenProps] = useState<{
    restDataCount: number;
    onClickRestDataCount: () => void;
    onClickDay: () => void;
  } | null>(null);

  const calendarDayChildren = getCalendarDayChildren(date) as ReactElement;

  useEffect(() => {
    if (!calendarDayChildren) {
      setCalendarDayChildrenProps(null);
      return;
    }

    const props = calendarDayChildren.props as {
      restDataCount: number;
      onClickRestDataCount: () => void;
      onClickDay: () => void;
    };
    setCalendarDayChildrenProps(props);
  }, [calendarDayChildren]);

  return (
    <Layout>
      <DayContainer>
        <Day
          isToday={isToday(date)}
          onClick={calendarDayChildrenProps?.onClickDay}
          hasClick={!!calendarDayChildrenProps && 'onClickDay' in calendarDayChildrenProps}
          isCurrentMonthDay={state === 'cur'}
          dayOfWeek={dayOfWeek}
        >
          {day}
        </Day>
        {calendarDayChildrenProps && calendarDayChildrenProps.restDataCount > 0 && (
          <RestRecords onClick={calendarDayChildrenProps.onClickRestDataCount}>
            +{calendarDayChildrenProps.restDataCount}
          </RestRecords>
        )}
      </DayContainer>
      {/* {calendarDayChildren === 'name' ? (
        <Records>
          {records.slice(0, 3).map(({ studyId, name }) => (
            <Record test-id="study-id" key={studyId} onClick={() => handleClickStudyItem(studyId)}>
              {name}
            </Record>
          ))}
        </Records>
      ) : (
        <TotalRecordCount onClick={() => openRecordsDetail(format.date(date), records)}>
          {records.length > 0 ? <span>{records.length}</span> : ''}
        </TotalRecordCount>
      )} */}
      {calendarDayChildren && calendarDayChildren}
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

const Records = styled.ul`
  display: grid;
  row-gap: 4px;
`;

const Record = styled.li`
  padding: 2px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  background-color: ${color.neutral[100]};
  border-radius: 5px;

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
