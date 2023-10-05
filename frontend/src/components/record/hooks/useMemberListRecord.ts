/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import useMutation from '@Hooks/api/useMutation';

import { requestGetMemberListRecord } from '@Apis/index';

import type { StudyBasicInfo } from '@Types/study';

import { useMemberRecordPeriod } from '../contexts/MemberRecordPeriodProvider';

type Props = {
  memberId: string;
};

const useMemberListRecord = ({ memberId }: Props) => {
  const { startDate, endDate, period, page, updateUrlPage } = useMemberRecordPeriod();

  const [memberRecords, setMemberRecords] = useState<StudyBasicInfo[] | null>(null);
  const [totalPagesNumber, setTotalPagesNumber] = useState<number>(1);

  const { mutate, result, isLoading } = useMutation(() =>
    requestGetMemberListRecord(memberId, page - 1, 20, startDate, endDate),
  );

  const shiftPage = (page: number) => updateUrlPage(page);

  useEffect(() => {
    mutate();
  }, [page, period]);

  useEffect(() => {
    if (!result) return;

    const { studyRecords, pageInfo } = result.data;

    setMemberRecords(studyRecords || []);
    if (totalPagesNumber === 1 || pageInfo.totalPages !== pageInfo.totalPages + 1)
      setTotalPagesNumber(pageInfo.totalPages + 1);
  }, [result]);

  return { memberRecords, isLoading, totalPagesNumber, shiftPage, currentPageNumber: page };
};

export default useMemberListRecord;
