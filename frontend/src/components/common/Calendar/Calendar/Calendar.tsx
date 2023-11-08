import type { PropsWithChildren } from 'react';
import { useRef } from 'react';
import { styled } from 'styled-components';

import CalendarProvider from './CalendarContext/CalendarProvider';
import ControlBar from './ControlBar/ControlBar';
import DayItemWrapper from './DayItemWrapper/DayItemWrapper';
import DayList from './DayList/DayList';
import DayOfWeeks from './DayOfWeeks/DayOfWeeks';

type Props = {
  /**
   * 달력의 년도를 지정하는 속성.
   *
   *  * @default 2023
   */
  year: number;
  /**
   * 달력의 월을 지정하는 속성.
   *
   *  * @default 11
   */
  month: number;
  /**
   * 달력의 년, 월이 바뀔 때 호출되는 함수. year, month를 매개변수로 받음.
   *
   */
  onChangeCalendar?: (year: number, month: number) => void;
};

const Calendar = ({
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  onChangeCalendar,
  children,
}: PropsWithChildren<Props>) => {
  const calendarRef = useRef<HTMLUListElement>(null);

  return (
    <CalendarProvider initYear={year} initMonth={month} calendarData={children} onChangeCalendar={onChangeCalendar}>
      <Layout>
        <ControlBar />
        <CalendarContainer>
          <DayOfWeeks />
          <DayList calendarRef={calendarRef} />
        </CalendarContainer>
      </Layout>
    </CalendarProvider>
  );
};

Calendar.Item = DayItemWrapper;

export default Calendar;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  user-select: none;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
