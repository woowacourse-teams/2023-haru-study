/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import useMutation from '@Hooks/api/useMutation';

import format from '@Utils/format';

import { requestGetMemberCalendarRecord } from '@Apis/index';

import type { CalendarRecord, MonthStorage } from '@Types/record';

type Props = {
  monthStorage: MonthStorage;
  calendarRef: React.RefObject<HTMLUListElement>;
  memberId: string;
};

const useMemberCalendarRecord = ({ monthStorage, calendarRef, memberId }: Props) => {
  const [calendarRecord, setCalendarRecord] = useState<CalendarRecord[]>([]);
  const [calendarData, setCalendarData] = useState<'name' | 'count'>('name');

  const startDate = format.date(new Date(monthStorage.at(0)!.date), '-');
  const endDate = format.date(new Date(monthStorage.at(-1)!.date), '-');

  const { mutate, isLoading } = useMutation(() => requestGetMemberCalendarRecord(memberId, startDate, endDate), {
    onSuccess: (result) => {
      if (!result) return;

      const studyRecords = result?.data.studyRecords;

      const calendarRecord = (monthStorage = monthStorage.map((item) => {
        const records = studyRecords[format.date(item.date, '-')] || [];

        const restRecordsNumber = records && records.length > 3 ? records.length - 3 : 0;

        return { ...item, records, restRecordsNumber };
      }));

      setCalendarRecord(calendarRecord);
    },
  });

  useEffect(() => {
    mutate();
  }, [startDate, endDate]);

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
