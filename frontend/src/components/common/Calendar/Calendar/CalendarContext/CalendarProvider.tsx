import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { Children, createContext, useContext, useState } from 'react';

import type { CalendarStorage } from '@Utils/Calendar/Calendar';
import calendar from '@Utils/Calendar/Calendar';
import format from '@Utils/format';

type CalendarContext = {
  year: number;
  month: number;
  navigationYear: number;
  navigationMonth: number;
  calendarStorage: CalendarStorage;
  isToday: (date: Date) => boolean;
  shiftMonth: (type: 'next' | 'prev' | 'today') => void;
  navigateYear: (year: number) => void;
  navigateMonth: (month: number) => void;
  navigate: (year?: number, month?: number) => void;
  getCalendarDayChildren: (date: Date) => ReactNode;
};

type Props = {
  initYear: number;
  initMonth: number;
  calendarData: ReactNode;
  onChangeCalendar?: (year: number, month: number) => void;
};

const CalendarContext = createContext<CalendarContext | null>(null);

const CalendarProvider = ({
  initYear,
  initMonth,
  calendarData,
  children,
  onChangeCalendar,
}: PropsWithChildren<Props>) => {
  const [year, setYear] = useState(initYear);
  const [month, setMonth] = useState(initMonth);
  const [navigationYear, setNavigationYear] = useState(initYear);
  const [navigationMonth, setNavigationMonth] = useState(initMonth);
  const [calendarStorage, setCalendarStorage] = useState<CalendarStorage>(calendar.getCalendarStorage(year, month));

  const getCalendarDayChildren = (date: Date) => {
    return Children.toArray(calendarData).find((child) => {
      const item = child as ReactElement;
      const { date: inputDate } = item.props as { date: string };

      if (format.date(date, '-') === inputDate) return item;
    });
  };

  const isToday = (date: Date) => {
    const today = format.date(new Date());
    const inputDate = format.date(date);

    return today === inputDate;
  };

  const shiftMonth = (type: 'next' | 'prev' | 'today') => {
    let newYear = year;
    let newMonth = month;

    if (type === 'today') {
      const today = new Date();

      newYear = today.getFullYear();
      newMonth = today.getMonth() + 1;
    }

    const changedMonth = month + (type === 'next' ? +1 : -1);

    if (type !== 'today' && changedMonth === 0) {
      newYear -= 1;
      newMonth = 12;
    }

    if (type !== 'today' && changedMonth === 13) {
      newYear += 1;
      newMonth = 1;
    }

    if (type !== 'today' && changedMonth > 0 && changedMonth < 13) {
      newMonth = changedMonth;
    }

    setYear(newYear);
    setMonth(newMonth);
    setNavigationYear(newYear);
    setNavigationMonth(newMonth);

    setCalendarStorage(calendar.getCalendarStorage(newYear, newMonth));

    if (onChangeCalendar) onChangeCalendar(newYear, newMonth);
  };

  const navigateYear = (year: number) => setNavigationYear(year);

  const navigateMonth = (month: number) => setNavigationMonth(month);

  const navigate = (year?: number, month?: number) => {
    if (year && month) {
      setYear(year);
      setMonth(month);

      setCalendarStorage(calendar.getCalendarStorage(year, month));

      if (onChangeCalendar) onChangeCalendar(year, month);
      return;
    }

    setYear(navigationYear);
    setMonth(navigationMonth);

    setCalendarStorage(calendar.getCalendarStorage(navigationYear, navigationMonth));

    if (onChangeCalendar) onChangeCalendar(navigationYear, navigationMonth);
  };

  const initValue = {
    year,
    month,
    navigationYear,
    navigationMonth,
    calendarStorage,
    isToday,
    shiftMonth,
    navigateYear,
    navigateMonth,
    navigate,
    getCalendarDayChildren,
  };

  return <CalendarContext.Provider value={initValue}>{children}</CalendarContext.Provider>;
};

export default CalendarProvider;

export const useCalendar = () => {
  const value = useContext(CalendarContext);

  if (!value) throw new Error('calendar가 적절하지 않는 곳에서 호출되었습니다.');

  return value;
};
