import { useEffect, useState } from 'react';

import format from '@Utils/format';

import type { MonthStorage } from '@Types/record';
import type { StudyBasicInfo } from '@Types/study';

const STUDY_LIST: { studies: StudyBasicInfo[] } = {
  studies: [
    {
      studyId: '1',
      name: '짧고 빠른 공부방',
      totalCycle: 3,
      timePerCycle: 20,
      createdDateTime: '2023-10-10T13:33:02.810Z',
    },
    {
      studyId: '52',
      name: '짧고 빠른 공부방',
      totalCycle: 3,
      timePerCycle: 20,
      createdDateTime: '2023-10-10T13:33:02.810Z',
    },
    {
      studyId: '53',
      name: '짧고 빠른 공부방',
      totalCycle: 3,
      timePerCycle: 20,
      createdDateTime: '2023-10-10T13:33:02.810Z',
    },
    {
      studyId: '54',
      name: '짧고 빠른 공부방',
      totalCycle: 3,
      timePerCycle: 20,
      createdDateTime: '2023-10-10T13:33:02.810Z',
    },
    {
      studyId: '41',
      name: '짧고 빠른 공부방',
      totalCycle: 3,
      timePerCycle: 20,
      createdDateTime: '2023-10-11T13:33:02.810Z',
    },
    {
      studyId: '42',
      name: '짧고 빠른 공부방2',
      totalCycle: 3,
      timePerCycle: 20,
      createdDateTime: '2023-10-11T13:33:02.810Z',
    },
    {
      studyId: '31',
      name: '심야 공부방',
      totalCycle: 3,
      timePerCycle: 50,
      createdDateTime: '2023-10-12T13:33:02.810Z',
    },
    {
      studyId: '32',
      name: '심야 공부방1',
      totalCycle: 3,
      timePerCycle: 50,
      createdDateTime: '2023-10-12T13:33:02.810Z',
    },
    {
      studyId: '33',
      name: '심야 공부방2',
      totalCycle: 3,
      timePerCycle: 50,
      createdDateTime: '2023-10-12T13:33:02.810Z',
    },
    {
      studyId: '7',
      name: '와도 지상렬 지상렬444444412312312312313123',
      totalCycle: 6,
      timePerCycle: 30,
      createdDateTime: '2023-10-14T13:33:02.810Z',
    },
    {
      studyId: '1',
      name: '안오면 지상렬123123123',
      totalCycle: 3,
      timePerCycle: 60,
      createdDateTime: '2023-10-16T13:33:02.810Z',
    },
    {
      studyId: '5',
      name: '안오면 지상렬222221231232',
      totalCycle: 3,
      timePerCycle: 60,
      createdDateTime: '2023-10-16T13:33:02.810Z',
    },
    {
      studyId: '6',
      name: '안오면 지상렬3333333123123',
      totalCycle: 3,
      timePerCycle: 60,
      createdDateTime: '2023-10-16T13:33:02.810Z',
    },
    {
      studyId: '8',
      name: '안오면 지상렬3333333123123',
      totalCycle: 3,
      timePerCycle: 60,
      createdDateTime: '2023-10-16T13:33:02.810Z',
    },
    {
      studyId: '9',
      name: '와도 지상렬 지상렬444444412312 312312313123',
      totalCycle: 3,
      timePerCycle: 60,
      createdDateTime: '2023-10-16T13:33:02.810Z',
    },
    {
      studyId: '12',
      name: '안오면 dfdsfee222222지상렬3333333123123',
      totalCycle: 3,
      timePerCycle: 60,
      createdDateTime: '2023-11-01T13:33:02.810Z',
    },
  ],
};

type Props = {
  monthStorage: MonthStorage;
  calendarRef: React.RefObject<HTMLUListElement>;
};

const useMemberCalendarRecord = ({ monthStorage, calendarRef }: Props) => {
  const [calendarData, setCalendarData] = useState<'name' | 'count'>('name');

  const studiesMap: Record<string, StudyBasicInfo[]> = {};
  STUDY_LIST.studies.forEach((study) => {
    const date = format.date(new Date(study.createdDateTime));

    if (date in studiesMap) {
      studiesMap[date] = [...studiesMap[date], study];
      return;
    }

    studiesMap[date] = [study];
  });

  const temp = (monthStorage = monthStorage.map((item) => {
    const records = studiesMap[format.date(item.date)] || [];

    const restRecords = records && records.length > 3 ? records.length - 3 : 0;

    return { ...item, records, restRecords };
  }));

  useEffect(() => {
    const calendarResizeObserver = new ResizeObserver(([calendar]) => {
      const calendarWidth = calendar.target.clientWidth;

      if (calendarWidth < 750) return setCalendarData('count');

      return setCalendarData('name');
    });

    if (!calendarRef.current) return;

    calendarResizeObserver.observe(calendarRef.current);
  }, [calendarRef]);

  return { temp, calendarData };
};

export default useMemberCalendarRecord;
