import { useState } from 'react';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

import format from '@Utils/format';

import CalendarControl from '../CalendarControl/CalendarControl';

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
        <DayOfWeek>
          {['일', '월', '화', '수', '목', '금', '토'].map((dayOfWeek) => (
            <li
              key={dayOfWeek}
              style={{
                color: dayOfWeek === '일' ? color.red[600] : dayOfWeek === '토' ? color.blue[600] : color.black,
              }}
            >
              {dayOfWeek}
            </li>
          ))}
        </DayOfWeek>
        <Days $numberOfWeeks={monthStorage.length / 7}>
          {monthStorage.map(({ fullDate, state, dayOfWeek, day }) => (
            <li key={fullDate}>
              <Day
                $isCurrentMonthDay={state === 'cur'}
                $isToday={fullDate === format.date(today)}
                $isSunday={dayOfWeek === 0}
                $isSaturday={dayOfWeek === 6}
              >
                {day}
              </Day>
            </li>
          ))}
        </Days>
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

const DayOfWeek = styled.ul`
  display: flex;

  li {
    flex: 1;
    margin-left: 5px;
  }
`;

type DaysProps = {
  $numberOfWeeks: number;
};

const Days = styled.ul<DaysProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${({ $numberOfWeeks }) => `repeat(${$numberOfWeeks}, minmax(120px, auto))`};
  gap: 1px;
  border: 1px solid ${color.neutral[100]};

  background-color: ${color.neutral[100]};

  li {
    padding: 5px;

    background-color: ${color.white};
  }
`;

type DayProps = {
  $isCurrentMonthDay: boolean;
  $isToday: boolean;
  $isSunday: boolean;
  $isSaturday: boolean;
};

const Day = styled.div<DayProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
  border-radius: 50%;

  width: 30px;
  height: 30px;

  background-color: ${color.white};

  ${({ $isCurrentMonthDay, $isSunday, $isSaturday, $isToday }) => css`
    opacity: ${$isCurrentMonthDay ? 1 : 0.5};
    color: ${$isSaturday ? color.blue[600] : $isSunday ? color.red[600] : color.black};

    background-color: ${$isToday && color.neutral[100]};
  `}
`;

//

const getDatesPrevMonth = (
  lastDatePrevMonth: Date,
): {
  day: number;
  dayOfWeek: number;
  fullDate: string;
  state: 'prev' | 'cur' | 'next';
}[] => {
  const storage: {
    day: number;
    dayOfWeek: number;
    fullDate: string;
    state: 'prev' | 'cur' | 'next';
  }[] = [];

  const lastDate = lastDatePrevMonth.getDate(); // 이전달의 마지막 일
  const lastDay = lastDatePrevMonth.getDay(); // 이전달의 마지막 요일
  const prevMonth = lastDatePrevMonth.getMonth(); // 이전 달
  const prevYear = lastDatePrevMonth.getFullYear(); // 이전 년도

  if (lastDay === 6) return storage; // 이전 달의 마지막 요일이 토요일 경우

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

const getDatesCurrentMonth = (
  firstDateCurrentMonth: Date,
  lastDateCurrentMonth: Date,
): {
  day: number;
  dayOfWeek: number;
  fullDate: string;
  state: 'prev' | 'cur' | 'next';
}[] => {
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

const getDatesNextMonth = (
  firstDateNextMonth: Date,
): {
  day: number;
  dayOfWeek: number;
  fullDate: string;
  state: 'prev' | 'cur' | 'next';
}[] => {
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
