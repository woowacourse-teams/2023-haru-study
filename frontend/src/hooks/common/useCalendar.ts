import { useState } from 'react';

import calendar from '@Utils/calendar';

const useCalendar = (date?: Date) => {
  const standardDate = date || new Date();

  const [year, setYear] = useState(standardDate.getFullYear());
  const [month, setMonth] = useState(standardDate.getMonth() + 1);
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

  const handleYearShift = (year: number) => setYear(year);

  const handleNavigationYear = (type: 'next' | 'prev' | number) => {
    if (type === 'next') setNavigationYear((prev) => prev + 1);
    else setNavigationYear((prev) => prev - 1);
  };

  const handleNavigationMonth = (month: number) => {
    setYear(navigationYear);
    setMonth(month);
  };

  const monthStorage = calendar.getMonthStorage(year, month);

  return {
    year,
    month,
    navigationYear,
    handleMonthShift,
    handleYearShift,
    handleNavigationMonth,
    handleNavigationYear,
    monthStorage,
  };
};

export default useCalendar;
