import { styled } from 'styled-components';

import useCalendar from '@Hooks/common/useCalendar';

import CalendarDayOfWeeks from '../CalendarDayOfWeeks/CalendarDayOfWeeks';
import MemberRecordCalendarControlBar from '../MemberRecordCalendarControlBar/MemberRecordCalendarControlBar';
import MemberRecordCalendarDays from '../MemberRecordCalendarDays/MemberRecordCalendarDays';

type Props = {
  memberId: string;
};

const MemberRecordCalendar = ({ memberId }: Props) => {
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
        <CalendarDayOfWeeks />
        <MemberRecordCalendarDays monthStorage={monthStorage} memberId={memberId} />
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
