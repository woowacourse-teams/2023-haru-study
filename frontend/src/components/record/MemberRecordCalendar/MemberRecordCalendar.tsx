import { styled } from 'styled-components';

import useCalendar from '@Hooks/common/useCalendar';

import CalendarControl from '../CalendarControl/CalendarControl';
import CalendarDayOfWeeks from '../CalendarDayOfWeeks/CalendarDayOfWeeks';
import CalendarDays from '../CalendarDays/CalendarDays';

const MemberRecordCalendar = () => {
  const { year, month, navigationYear, monthStorage, handleMonthShift, handleNavigationMonth, handleNavigationYear } =
    useCalendar();

  return (
    <Layout>
      <CalendarControl
        year={year}
        month={month}
        navigationYear={navigationYear}
        handleMonthShift={handleMonthShift}
        handleNavigationYear={handleNavigationYear}
        handleNavigationMonth={handleNavigationMonth}
      />
      <Calendar>
        <CalendarDayOfWeeks />
        <CalendarDays monthStorage={monthStorage} />
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
