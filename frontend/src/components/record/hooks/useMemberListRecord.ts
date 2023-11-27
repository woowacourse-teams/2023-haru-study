/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import useCacheFetch from '@Hooks/api/useCacheFetch';
import usePreFetch from '@Hooks/api/usePreFetch';

import format from '@Utils/format';

import { requestGetMemberListRecord } from '@Apis/index';

import type { StudyInfo } from '@Types/study';

import { useMemberRecordPeriod } from '../contexts/MemberRecordPeriodProvider';

type Props = {
  memberId: string;
};

const useMemberListRecord = ({ memberId }: Props) => {
  const { startDate, endDate, page, triggerSearchRecord, updatePage } = useMemberRecordPeriod();

  const stringStartDate = startDate ? format.date(startDate, '-') : null;
  const stringEndDate = endDate ? format.date(endDate, '-') : null;

  const [memberRecords, setMemberRecords] = useState<StudyInfo[] | null>(null);
  const [totalPagesNumber, setTotalPagesNumber] = useState<number>(1);

  const { cacheFetch, result, isLoading } = useCacheFetch(
    () => requestGetMemberListRecord(memberId, page - 1, 20, stringStartDate, stringEndDate),
    {
      cacheKey: [stringStartDate || '', stringEndDate || '', String(page)],
      cacheTime: 30 * 1000,
      enabled: false,
    },
  );

  const { prefetch } = usePreFetch();

  const shiftPage = (page: number) => updatePage(page);

  useEffect(() => {
    cacheFetch();
  }, [triggerSearchRecord]);

  useEffect(() => {
    if (!result) return;

    const { studyRecords, pageInfo } = result.data;

    setMemberRecords(studyRecords || []);
    if (totalPagesNumber === 1 || pageInfo.totalPages !== pageInfo.totalPages + 1)
      setTotalPagesNumber(pageInfo.totalPages);

    prefetch(() => requestGetMemberListRecord(memberId, page, 20, stringStartDate, stringEndDate), {
      cacheKey: [stringStartDate || '', stringEndDate || '', String(page + 1)],
      cacheTime: 30 * 1000,
    });
  }, [result]);

  return { memberRecords, isLoading, totalPagesNumber, shiftPage, currentPageNumber: page };
};

export default useMemberListRecord;
