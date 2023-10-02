import { styled } from 'styled-components';

import useCalendar from '@Hooks/common/useCalendar';

import CalendarDayOfWeeks from '../CalendarDayOfWeeks/CalendarDayOfWeeks';
import MemberRecordCalendarControlBar from '../MemberRecordCalendarControlBar/MemberRecordCalendarControlBar';
import MemberRecordCalendarDays from '../MemberRecordCalendarDays/MemberRecordCalendarDays';

const MemberRecordCalendar = () => {
  const { year, month, navigationYear, monthStorage, handleMonthShift, handleNavigationMonth, handleNavigationYear } =
    useCalendar();

  return (
    <Layout>
      <MemberRecordCalendarControlBar
        year={year}
        month={month}
        navigationYear={navigationYear}
        handleMonthShift={handleMonthShift}
        handleNavigationYear={handleNavigationYear}
        handleNavigationMonth={handleNavigationMonth}
      />
      <Calendar>
        {/* 여기를 Suspense로 묶어야 함 */}
        <CalendarDayOfWeeks />
        {/* CalendarDays에서 date fetching */}
        <MemberRecordCalendarDays monthStorage={monthStorage} />
      </Calendar>
    </Layout>
  );
};

export default MemberRecordCalendar;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  user-select: none;
`;

const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
