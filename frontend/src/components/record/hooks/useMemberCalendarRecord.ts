/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import useCacheMutation from '@Hooks/api/useCacheMutation';

import debouncing from '@Utils/debouncing';
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

  const { mutate, result, isLoading } = useCacheMutation(
    () => requestGetMemberCalendarRecord(memberId, startDate, endDate),
    {
      queryKey: [startDate, endDate],
      cacheTime: 60 * 60 * 1000,
    },
  );

  useEffect(() => {
    if (result) debouncing(mutate);
    else mutate();
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
