/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import useCacheFetch from '@Hooks/api/useCacheFetch';

import debouncing from '@Utils/debouncing';

import { requestGetMemberListRecord } from '@Apis/index';

import type { StudyInfo } from '@Types/study';

import { useMemberRecordPeriod } from '../contexts/MemberRecordPeriodProvider';

type Props = {
  memberId: string;
};

const useMemberListRecord = ({ memberId }: Props) => {
  const { startDate, endDate, page, triggerSearchRecord, updatePage } = useMemberRecordPeriod();

  const [memberRecords, setMemberRecords] = useState<StudyInfo[] | null>(null);
  const [totalPagesNumber, setTotalPagesNumber] = useState<number>(1);

  const { mutate, result, isLoading } = useCacheFetch(
    () => requestGetMemberListRecord(memberId, page - 1, 20, startDate, endDate),
    {
      cacheKey: [startDate || '', endDate || '', String(page)],
      cacheTime: 60 * 60 * 1000,
    },
  );

  const shiftPage = (page: number) => updatePage(page);

  useEffect(() => {
    if (result) debouncing(mutate);
    else mutate();
  }, [triggerSearchRecord]);

  useEffect(() => {
    if (!result) return;

    const { studyRecords, pageInfo } = result.data;

    setMemberRecords(studyRecords || []);
    if (totalPagesNumber === 1 || pageInfo.totalPages !== pageInfo.totalPages + 1)
      setTotalPagesNumber(pageInfo.totalPages);
  }, [result]);

  return { memberRecords, isLoading, totalPagesNumber, shiftPage, currentPageNumber: page };
};

export default useMemberListRecord;
