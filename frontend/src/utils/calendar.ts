import type { MonthStorage } from '@Types/record';

const calendar = {
  // year, month에 해당하는 요일을 담은 저장소 가져오기
  getMonthStorage: (year: number, month: number) => {
    const lastDatePrevMonth = calendar.getLastDatePrevMonth(year, month);
    const firstDateNextMonth = calendar.getFirstDateNextMonth(year, month);
    const firstDateCurrentMonth = calendar.getFirstDateCurrentMonth(year, month);
    const lastDateCurrentMonth = calendar.getLastDateCurrentMonth(year, month);

    const prevMonthStorage = calendar.getDatesPrevMonth(lastDatePrevMonth);
    const nextMonthStorage = calendar.getDatesNextMonth(firstDateNextMonth);
    const currentMonthStorage = calendar.getDatesCurrentMonth(firstDateCurrentMonth, lastDateCurrentMonth);

    return [...prevMonthStorage, ...currentMonthStorage, ...nextMonthStorage];
  },

  // 이전달의 마지막 날
  getLastDatePrevMonth: (year: number, month: number) => new Date(year, month - 1, 0),

  // 다음달의 첫번째 날
  getFirstDateNextMonth: (year: number, month: number) => new Date(year, month, 1),

  // 이번달의 첫번째 날
  getFirstDateCurrentMonth: (year: number, month: number) => new Date(year, month - 1),

  // 이번달의 마지막 날
  getLastDateCurrentMonth: (year: number, month: number) => new Date(year, month, 0),

  // 지난 달의 마지막 주 가져오기
  getDatesPrevMonth: (lastDatePrevMonth: Date): MonthStorage => {
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
        date: new Date(prevYear, prevMonth, day),
        // fullDate: `${prevYear}년 ${prevMonth + 1}월 ${day}일`,
        // fullDateDash: `${prevYear}-${prevMonth + 1}-${day}`,
        // fullDateDot: `${prevYear}.${prevMonth + 1}.${day}`,
        state: 'prev',
      };
    });
  },

  // 이번달 가져오기
  getDatesCurrentMonth: (firstDateCurrentMonth: Date, lastDateCurrentMonth: Date): MonthStorage => {
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
        date: new Date(currentYear, currentMonth, day),
        // fullDate: `${currentYear}년 ${currentMonth + 1}월 ${day}일`,
        // fullDateDash: `${currentYear}-${currentMonth + 1}-${day}`,
        // fullDateDot: `${currentYear}.${currentMonth + 1}.${day}`,
        state: 'cur',
      };
    });
  },

  // 다음 달의 첫번째 주 가져오기
  getDatesNextMonth: (firstDateNextMonth: Date): MonthStorage => {
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
        date: new Date(nextYear, nextMonth, day),
        // fullDate: `${nextYear}년 ${nextMonth + 1}월 ${day}일`,
        // fullDateDash: `${nextYear}-${nextMonth + 1}-${day}`,
        // fullDateDot: `${nextYear}.${nextMonth + 1}.${day}`,
        state: 'next',
      };
    });
  },
};

export default calendar;
