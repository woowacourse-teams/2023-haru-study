import type { PropsWithChildren, ReactElement, ReactNode, RefObject } from 'react';
import { Children, createContext, useContext, useEffect, useState } from 'react';

import type { CalendarStorage } from '@Utils/calendar';
import calendar from '@Utils/calendar';
import format from '@Utils/format';

type CalendarContext = {
  year: number;
  month: number;
  navigationYear: number;
  navigationMonth: number;
  limit?: number;
  calendarStorage: CalendarStorage;
  calendarDataFormat: 'long' | 'short';
  dataLoading: boolean;
  isToday: (date: Date) => boolean;
  shiftMonth: (type: 'next' | 'prev' | 'today') => void;
  navigateYear: (year: number) => void;
  navigateMonth: (month: number) => void;
  navigate: (year?: number, month?: number) => void;
  onClickDay?: (date: Date) => void;
  onClickRestDataCount?: (date: Date) => void;
  onClickTotalDataCount?: (date: Date) => void;
};

type Props = {
  year: number;
  month: number;
  limit?: number;
  formatChangedWidth: number;
  calendarDataChildren: ReactNode;
  calendarRef: RefObject<HTMLUListElement>;
  dataLoading: boolean;
  onChangeCalendar?: (year: number, month: number) => void;
  onClickDay?: (date: Date) => void;
  onClickRestDataCount?: (date: Date) => void;
  onClickTotalDataCount?: (date: Date) => void;
};

const CalendarContext = createContext<CalendarContext | null>(null);

const CalendarProvider = ({
  year,
  month,
  limit,
  formatChangedWidth,
  calendarDataChildren,
  children,
  calendarRef,
  dataLoading,
  onChangeCalendar,
  onClickDay,
  onClickRestDataCount,
  onClickTotalDataCount,
}: PropsWithChildren<Props>) => {
  const [navigationYear, setNavigationYear] = useState(year);
  const [navigationMonth, setNavigationMonth] = useState(month);
  const [calendarDataFormat, setCalendarDataFormat] = useState<'long' | 'short'>('long');

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

    setNavigationYear(newYear);
    setNavigationMonth(newMonth);

    if (onChangeCalendar) onChangeCalendar(newYear, newMonth);
  };

  const navigateYear = (year: number) => setNavigationYear(year);

  const navigateMonth = (month: number) => setNavigationMonth(month);

  const navigate = (year?: number, month?: number) => {
    if (year && month) {
      if (onChangeCalendar) onChangeCalendar(year, month);
      return;
    }

    if (onChangeCalendar) onChangeCalendar(navigationYear, navigationMonth);
  };

  useEffect(() => {
    const calendarResizeObserver = new ResizeObserver(([calendar]) => {
      const calendarWidth = calendar.target.clientWidth;

      if (calendarWidth < formatChangedWidth) return setCalendarDataFormat('short');

      return setCalendarDataFormat('long');
    });

    if (!calendarRef.current) return;

    calendarResizeObserver.observe(calendarRef.current);
  }, [calendarRef, formatChangedWidth]);

  const calendarDataObject: Record<string, ReactElement[]> = {};

  Children.forEach(calendarDataChildren, (child) => {
    const item = child as ReactElement;

    const { date } = item.props as { date: Date };

    const formatDate = format.date(date, '-');
    calendarDataObject[formatDate] = calendarDataObject[formatDate]
      ? [...calendarDataObject[formatDate], item]
      : [item];
  });

  const calendarStorage = calendar.getCalendarStorage(year, month).map((item) => {
    const formatDate = format.date(item.date, '-');

    return { ...item, children: calendarDataObject[formatDate] };
  });

  const initValue = {
    year,
    month,
    navigationYear,
    navigationMonth,
    limit,
    calendarStorage,
    calendarDataFormat,
    dataLoading,
    isToday,
    shiftMonth,
    navigateYear,
    navigateMonth,
    navigate,
    onClickDay,
    onClickRestDataCount,
    onClickTotalDataCount,
  };

  return <CalendarContext.Provider value={initValue}>{children}</CalendarContext.Provider>;
};

export default CalendarProvider;

export const useCalendar = () => {
  const value = useContext(CalendarContext);

  if (!value) throw new Error('적절하지 않는 곳에서 useCalendar를 호출했습니다.');

  return value;
};
