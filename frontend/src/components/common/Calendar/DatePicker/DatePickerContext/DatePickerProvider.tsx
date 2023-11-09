import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

import color from '@Styles/color';

import type { CalendarStorage } from '@Utils/Calendar/Calendar';
import calendar from '@Utils/Calendar/Calendar';
import format from '@Utils/format';

type DatePickerContext = {
  startDate?: Date;
  endDate?: Date;
  year: number;
  month: number;
  calendarStorage: CalendarStorage;
  handleMonthShift: (type: 'next' | 'prev' | 'today') => void;
  handleNavigationYear: (year: number) => void;
  handleNavigationMonth: (year: number) => void;
  getDayBackgroundColor: (date: Date) => string;
  updateHoverDays: (date: Date) => void;
  updateStartEndDate: (date: Date) => void;
};

const DatePickerContext = createContext<DatePickerContext | null>(null);

type Props = {
  initStartDate?: Date;
  initEndDate?: Date;
  onChangeDate?: (startDate?: Date, endDate?: Date) => void;
};

const DatePickerProvider = ({ initStartDate, initEndDate, children, onChangeDate }: PropsWithChildren<Props>) => {
  const [startDate, setStart] = useState(initStartDate);
  const [endDate, setEnd] = useState(initEndDate);

  const today = new Date();

  const [year, setYear] = useState(startDate ? startDate.getFullYear() : today.getFullYear());
  const [month, setMonth] = useState(startDate ? startDate.getMonth() + 1 : today.getMonth() + 1);
  const [hoveredDay, setHoveredDay] = useState<Date | undefined>();

  const calendarStorage = calendar.getCalendarStorage(year, month);

  const handleMonthShift = (type: 'next' | 'prev' | 'today') => {
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
  };

  const handleNavigationYear = (year: number) => setYear(year);

  const handleNavigationMonth = (month: number) => setMonth(month);

  const getDayBackgroundColor = (date: Date) => {
    const fullDate = format.date(date, '-');

    if (startDate && format.date(startDate, '-') === fullDate) return color.blue[200];

    if (endDate && format.date(endDate, '-') === fullDate) return color.blue[200];

    if (isSoonSelectedDate(date) || isIncludeSelectDate(date)) return color.blue[100];

    if (fullDate === format.date(today)) return color.neutral[100];

    return 'transparent';
  };

  const isSoonSelectedDate = (date: Date) => {
    if (!hoveredDay || !startDate) return false;

    if (hoveredDay > startDate) {
      if (startDate <= date && hoveredDay >= date) return true;

      return false;
    } else {
      if (startDate >= date && hoveredDay <= date) return true;

      return false;
    }
  };

  const isIncludeSelectDate = (date: Date) => {
    if (!startDate || !endDate) return false;

    if (new Date(startDate) < date && new Date(endDate) >= date) return true;

    return false;
  };

  const updateHoverDays = (date: Date) => {
    if (!startDate) return;
    if (startDate && endDate) return;

    setHoveredDay(date);
  };

  const updateStartEndDate = (date: Date) => {
    setHoveredDay(date);

    let newStartDate: undefined | Date = undefined;
    let newEndDate: undefined | Date = undefined;

    if (!startDate) newStartDate = date;

    if (startDate && !endDate && new Date(startDate) > date) {
      newStartDate = date;
      newEndDate = startDate;
    }

    if (startDate && !endDate && new Date(startDate) < date) {
      newStartDate = startDate;
      newEndDate = date;
    }

    if (startDate && endDate) newStartDate = date;

    setStart(newStartDate);
    setEnd(newEndDate);

    if (onChangeDate) onChangeDate(newStartDate, newEndDate);
  };

  const initValue = {
    startDate,
    endDate,
    year,
    month,
    calendarStorage,
    handleMonthShift,
    handleNavigationYear,
    handleNavigationMonth,
    getDayBackgroundColor,
    updateHoverDays,
    updateStartEndDate,
  };

  return <DatePickerContext.Provider value={initValue}>{children}</DatePickerContext.Provider>;
};

export default DatePickerProvider;

export const useDatePicker = () => {
  const value = useContext(DatePickerContext);

  if (!value) throw new Error('적절하지 않는 곳에서 useDatePicker를 호출했습니다.');

  return value;
};
