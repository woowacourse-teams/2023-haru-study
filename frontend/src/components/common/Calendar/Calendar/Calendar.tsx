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
   * 달력에 렌더링 되는 데이터 형식이 바뀌는 기준 너비를 지정하는 속성. 해당 속성에 따라 Calendar.Item의 fullDataCount가 보여지는 기준이 달라짐.
   *
   *  * @default 750
   */
  formatChangedWidth?: number;
  /**
   * 달력의 년, 월이 바뀔 때 호출되는 함수. year, month를 매개변수로 받음.
   *
   */
  onChangeCalendar?: (year: number, month: number) => void;
  /**
   * 달력의 Day의 클릭할 때 호출되는 함수. 해당 Day의 Date 객체를 매개변수로 받음.
   *
   */
  onClickDay?: (date: Date) => void;
};

const Calendar = ({
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  formatChangedWidth = 750,
  children,
  onChangeCalendar,
  onClickDay,
}: PropsWithChildren<Props>) => {
  const calendarRef = useRef<HTMLUListElement>(null);

  return (
    <CalendarProvider
      initYear={year}
      initMonth={month}
      formatChangedWidth={formatChangedWidth}
      calendarDataChildren={children}
      calendarRef={calendarRef}
      onChangeCalendar={onChangeCalendar}
      onClickDay={onClickDay}
    >
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
