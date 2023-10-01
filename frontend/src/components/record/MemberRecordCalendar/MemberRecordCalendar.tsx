import { useState } from 'react';
import { styled } from 'styled-components';

import CalendarControl from '../CalendarControl/CalendarControl';
import CalendarDayOfWeeks from '../CalendarDayOfWeeks/CalendarDayOfWeeks';
import CalendarDays from '../CalendarDays/CalendarDays';

const MemberRecordCalendar = () => {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [navigationYear, setNavigationYear] = useState(year);

  const handleMonthShift = (type: 'next' | 'prev' | 'today') => {
    if (type === 'today') {
      const today = new Date();

      setYear(today.getFullYear());
      setMonth(today.getMonth() + 1);

      return;
    }

    const changedMonth = month + (type === 'next' ? +1 : -1);

    if (changedMonth === 0) {
      setYear((prev) => prev - 1);
      setNavigationYear((prev) => prev - 1);
      setMonth(12);
      return;
    }

    if (changedMonth === 13) {
      setYear((prev) => prev + 1);
      setNavigationYear((prev) => prev + 1);
      setMonth(1);
      return;
    }

    setMonth(changedMonth);
  };

  const handleNavigationYear = (type: 'next' | 'prev') => {
    if (type === 'next') setNavigationYear((prev) => prev + 1);
    else setNavigationYear((prev) => prev - 1);
  };

  const handleNavigationMonth = (month: number) => {
    setYear(navigationYear);
    setMonth(month);
  };

  // 이전달의 마지막 날
  const lastDatePrevMonth = new Date(year, month - 1, 0);

  // 다음달의 첫번째 날
  const firstDateNextMonth = new Date(year, month, 1);

  // 이번달의 첫번째 날
  const firstDateCurrentMonth = new Date(year, month - 1);

  // 이번달의 마지막 날
  const lastDateCurrentMonth = new Date(year, month, 0);

  const prevMonthStorage = getDatesPrevMonth(lastDatePrevMonth);
  const nextMonthStorage = getDatesNextMonth(firstDateNextMonth);
  const currentMonthStorage = getDatesCurrentMonth(firstDateCurrentMonth, lastDateCurrentMonth);

  const monthStorage = [...prevMonthStorage, ...currentMonthStorage, ...nextMonthStorage];

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

//

type MonthStorage = {
  day: number;
  dayOfWeek: number;
  fullDate: string;
  state: 'prev' | 'cur' | 'next';
}[];

const getDatesPrevMonth = (lastDatePrevMonth: Date): MonthStorage => {
  const lastDate = lastDatePrevMonth.getDate(); // 이전달의 마지막 일
  const lastDay = lastDatePrevMonth.getDay(); // 이전달의 마지막 요일
  const prevMonth = lastDatePrevMonth.getMonth(); // 이전 달
  const prevYear = lastDatePrevMonth.getFullYear(); // 이전 년도

  if (lastDay === 6) return []; // 이전 달의 마지막 요일이 토요일 경우

  return Array.from({ length: lastDay + 1 }).map((_, index) => {
    const day = lastDate - lastDay + index;
    const dayOfWeek = index;

    return {
      day,
      dayOfWeek,
      fullDate: `${prevYear}년 ${prevMonth + 1}월 ${day}일`,
      state: 'prev',
    };
  });
};

const getDatesCurrentMonth = (firstDateCurrentMonth: Date, lastDateCurrentMonth: Date): MonthStorage => {
  const firstDay = firstDateCurrentMonth.getDay(); // 이번달의 첫번째 요일
  const lastDate = lastDateCurrentMonth.getDate(); // 이번달의 마지막 일
  const currentMonth = firstDateCurrentMonth.getMonth(); // 이번 달
  const currentYear = firstDateCurrentMonth.getFullYear(); // 이번 년도

  return Array.from({ length: lastDate }).map((_, index) => {
    const day = index + 1;
    const dayOfWeek = (firstDay + index) % 7;

    return {
      day,
      dayOfWeek,
      fullDate: `${currentYear}년 ${currentMonth + 1}월 ${day}일`,
      state: 'cur',
    };
  });
};

const getDatesNextMonth = (firstDateNextMonth: Date): MonthStorage => {
  const firstDate = firstDateNextMonth.getDate(); // 다음달의 첫번째 일
  const firstDay = firstDateNextMonth.getDay(); // 다음달의 첫번째 요일
  const nextMonth = firstDateNextMonth.getMonth(); // 다음 달
  const nextYear = firstDateNextMonth.getFullYear(); // 다음 년도

  if (firstDay === 0) return []; // 다음 달의 첫번째 요일이 일요일 경우

  return Array.from({ length: 7 - firstDay }).map((_, index) => {
    const day = firstDate + index;
    const dayOfWeek = firstDay + index;

    return {
      day,
      dayOfWeek,
      fullDate: `${nextYear}년 ${nextMonth + 1}월 ${day}일`,
      state: 'next',
    };
  });
};
