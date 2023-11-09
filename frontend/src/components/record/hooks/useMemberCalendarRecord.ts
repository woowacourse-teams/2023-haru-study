/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import useCacheFetch from '@Hooks/api/useCacheFetch';
import usePreFetch from '@Hooks/api/usePreFetch';
import useSearchParams from '@Hooks/common/useSearchParams';

import calendar from '@Utils/Calendar/Calendar';
import format from '@Utils/format';

import { requestGetMemberCalendarRecord } from '@Apis/index';

import type { StudyInfo } from '@Types/study';

const useMemberCalendarRecord = (memberId: string) => {
  const { searchParams, updateSearchParams } = useSearchParams<{
    year: string;
    month: string;
  }>();

  const year = Number(searchParams.year);
  const month = Number(searchParams.month);

  const [renderYear, setRenderYear] = useState<number | null>(null);
  const [renderMonth, setRenderMonth] = useState<number | null>(null);

  const [calendarData, setCalendarData] = useState<StudyInfo[] | null>(null);

  const [startDate, endDate] = calendar.getMonthFirstLastDate(year, month).map((item) => {
    if (!item) return '';

    return format.date(item.date, '-');
  });

  const { cacheFetch, result, isLoading } = useCacheFetch(
    () => requestGetMemberCalendarRecord(memberId, startDate, endDate),
    {
      cacheKey: [startDate, endDate],
      cacheTime: 300 * 1000,
      enabled: false,
    },
  );

  const { prefetch } = usePreFetch();

  const prefetchSidesCalendarData = () => {
    const prevMonth = new Date(year, month - 2);
    const nextMonth = new Date(year, month);

    const [prevMonthStartDate, prevMonthEndDate] = calendar
      .getMonthFirstLastDate(prevMonth.getFullYear(), prevMonth.getMonth() + 1)
      .map((item) => {
        if (!item) return '';

        return format.date(item.date, '-');
      });

    const [nextMonthStartDate, nextMonthEndDate] = calendar
      .getMonthFirstLastDate(nextMonth.getFullYear(), nextMonth.getMonth() + 1)
      .map((item) => {
        if (!item) return '';

        return format.date(item.date, '-');
      });

    prefetch(() => requestGetMemberCalendarRecord(memberId, prevMonthStartDate, prevMonthEndDate), {
      cacheKey: [prevMonthStartDate, prevMonthEndDate],
      cacheTime: 300 * 1000,
    });

    prefetch(() => requestGetMemberCalendarRecord(memberId, nextMonthStartDate, nextMonthEndDate), {
      cacheKey: [nextMonthStartDate, nextMonthEndDate],
      cacheTime: 300 * 1000,
    });
  };

  const getStudies = (date: Date) =>
    calendarData?.filter((item) => format.date(new Date(item.createdDate), '-') === format.date(date, '-')) || [];

  const updateYearMonth = (year: number, month: number) =>
    updateSearchParams({
      year: String(year),
      month: String(month),
    });

  useEffect(() => {
    cacheFetch();
  }, [startDate, endDate]);

  useEffect(() => {
    if (!result) return;

    const studyRecords = result.data.studyRecords;

    setRenderYear(year);
    setRenderMonth(month);

    setCalendarData(Object.values(studyRecords).flat());
  }, [result]);

  useEffect(() => {
    prefetchSidesCalendarData();
  }, [year, month]);

  return {
    year: renderYear || year,
    month: renderMonth || month,
    calendarData,
    isLoading,
    getStudies,
    updateYearMonth,
  };
};

export default useMemberCalendarRecord;
