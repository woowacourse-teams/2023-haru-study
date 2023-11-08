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
   * 달력 내 Data 개수를 제한하는 속성.
   *
   */
  limit?: number;
  /**
   * 달력에 렌더링 되는 Data 형식이 바뀌는 기준 너비를 지정하는 속성. 지정된 값보다 달력의 너비가 줄어들면 Data의 전체 개수가 렌더링됨.
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
  /**
   * 달력에 보여지지 않는 Data의 개수를 클릭했을 때 호출되는 함수. 해당 Data가 위치한 Date 객체를 매개변수로 받음.
   *
   */
  onClickRestDataCount?: (date: Date) => void;
  /**
   * formatChangedWidth 속성의 값보다 달력의 너비가 줄어들었을 때, 렌덩이 되는 전체 데이터 개수를 클릭했을 때 호출되는 함수. 해당 Data가 위치한 Date 객체를 매개변수로 받음.
   *
   */
  onClickTotalDataCount?: (date: Date) => void;
};

const Calendar = ({
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  limit,
  formatChangedWidth = 750,
  children,
  onChangeCalendar,
  onClickDay,
  onClickRestDataCount,
  onClickTotalDataCount,
}: PropsWithChildren<Props>) => {
  const calendarRef = useRef<HTMLUListElement>(null);

  return (
    <CalendarProvider
      initYear={year}
      initMonth={month}
      limit={limit}
      formatChangedWidth={formatChangedWidth}
      calendarDataChildren={children}
      calendarRef={calendarRef}
      onChangeCalendar={onChangeCalendar}
      onClickDay={onClickDay}
      onClickRestDataCount={onClickRestDataCount}
      onClickTotalDataCount={onClickTotalDataCount}
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
