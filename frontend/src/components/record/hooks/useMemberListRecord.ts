/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

import useMutation from '@Hooks/api/useMutation';

import { requestGetMemberListRecord } from '@Apis/index';

import type { StudyBasicInfo } from '@Types/study';

import type { Period } from '../contexts/MemberRecordPeriodProvider';

type Props = {
  memberId: string;
  startDate: string | null;
  endDate: string | null;
  period: Period | null;
};

const useMemberListRecord = ({ memberId, startDate, endDate, period }: Props) => {
  const [memberRecords, setMemberRecords] = useState<StudyBasicInfo[] | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPagesNumber, setTotalPagesNumber] = useState<number>(1);

  const { mutate, result, isLoading } = useMutation(() =>
    requestGetMemberListRecord(memberId, currentPageNumber - 1, 20, startDate, endDate),
  );

  const shiftPage = useCallback((page: number) => {
    setCurrentPageNumber(page);
  }, []);

  useEffect(() => {
    mutate();
  }, [currentPageNumber, startDate, endDate]);

  useEffect(() => {
    if (!result) return;

    const {
      studyRecords,
      pageInfo: { totalPages },
    } = result.data;

    setMemberRecords(studyRecords || []);
    if (totalPagesNumber === 1 || totalPages !== totalPages + 1) setTotalPagesNumber(totalPages + 1);
  }, [result]);

  useEffect(() => {
    shiftPage(1);
  }, [period, shiftPage]);

  return { memberRecords, isLoading, totalPagesNumber, shiftPage, currentPageNumber };
};

export default useMemberListRecord;
