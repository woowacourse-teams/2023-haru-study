/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import useCacheFetch from '@Hooks/api/useCacheFetch';
import usePreFetch from '@Hooks/api/usePreFetch';

import calendar from '@Utils/calendar';
import format from '@Utils/format';

import { requestGetMemberCalendarRecord } from '@Apis/index';

import type { CalendarRecord, MonthStorage } from '@Types/record';

type Props = {
  monthStorage: MonthStorage;
  calendarRef: React.RefObject<HTMLUListElement>;
  memberId: string;
};

const useMemberCalendarRecord = ({ monthStorage, calendarRef, memberId }: Props) => {
  const [calendarRecord, setCalendarRecord] = useState<CalendarRecord[]>(
    monthStorage.map((item) => {
      return { ...item, records: [], restRecordsNumber: 0 };
    }),
  );

  const [calendarData, setCalendarData] = useState<'name' | 'count' | null>(null);

  const startDate = format.date(new Date(monthStorage.at(0)!.date), '-');
  const endDate = format.date(new Date(monthStorage.at(-1)!.date), '-');

  const { cacheFetch, result, isLoading } = useCacheFetch(
    () => requestGetMemberCalendarRecord(memberId, startDate, endDate),
    {
      cacheKey: [startDate, endDate],
      cacheTime: 30 * 1000,
      enabled: false,
    },
  );

  const { prefetch } = usePreFetch();

  const prefetchSidesCalendarData = (calendarRecord: CalendarRecord[]) => {
    const currentFirstDay = calendarRecord.find((record) => record.state === 'cur')?.date;

    if (!currentFirstDay) return;

    const currentYear = currentFirstDay.getFullYear();
    const currentMonth = currentFirstDay.getMonth();

    const prevMonth = new Date(currentYear, currentMonth - 1);
    const nextMonth = new Date(currentYear, currentMonth + 1);

    const [prevMonthStartDate, prevMonthEndDate] = calendar
      .getMonthFirstLastDate(prevMonth.getFullYear(), prevMonth.getMonth() + 1)
      .map((date) => {
        if (!date) return '';

        return format.date(date.date, '-');
      });

    const [nextMonthStartDate, nextMonthEndDate] = calendar
      .getMonthFirstLastDate(nextMonth.getFullYear(), nextMonth.getMonth() + 1)
      .map((date) => {
        if (!date) return '';

        return format.date(date.date, '-');
      });

    prefetch(() => requestGetMemberCalendarRecord(memberId, prevMonthStartDate, prevMonthEndDate), {
      cacheKey: [prevMonthStartDate, prevMonthEndDate],
      cacheTime: 30 * 1000,
    });

    prefetch(() => requestGetMemberCalendarRecord(memberId, nextMonthStartDate, nextMonthEndDate), {
      cacheKey: [nextMonthStartDate, nextMonthEndDate],
      cacheTime: 30 * 1000,
    });
  };

  useEffect(() => {
    cacheFetch();
  }, [startDate, endDate]);

  useEffect(() => {
    if (!result) return;

    const studyRecords = result.data.studyRecords;
    const calendarRecord = monthStorage.map((item) => {
      const records = studyRecords[format.date(item.date, '-')] || [];
      const restRecordsNumber = records && records.length > 3 ? records.length - 3 : 0;
      return { ...item, records, restRecordsNumber };
    });

    setCalendarRecord(calendarRecord);
    prefetchSidesCalendarData(calendarRecord);
  }, [result]);

  useEffect(() => {
    const calendarResizeObserver = new ResizeObserver(([calendar]) => {
      const calendarWidth = calendar.target.clientWidth;

      if (calendarWidth < 750) return setCalendarData('count');

      return setCalendarData('name');
    });

    if (!calendarRef.current) return;

    calendarResizeObserver.observe(calendarRef.current);
  }, [calendarRef]);

  return { calendarRecord, calendarData, isLoading };
};

export default useMemberCalendarRecord;
