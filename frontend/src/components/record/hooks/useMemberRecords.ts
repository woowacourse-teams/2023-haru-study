/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import useMutation from '@Hooks/api/useMutation';

import { requestGetMemberPeriodList } from '@Apis/index';

import type { StudyBasicInfo } from '@Types/study';

type Props = {
  memberId: string;

  startDate: string | null;
  endDate: string | null;
};

const useMemberRecords = ({ memberId, startDate, endDate }: Props) => {
  const [memberRecords, setMemberRecords] = useState<StudyBasicInfo[] | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPagesNumber, setTotalPagesNumber] = useState<number | null>(null);

  const { mutate, result, isLoading } = useMutation(() =>
    requestGetMemberPeriodList(memberId, currentPageNumber - 1, 20, startDate, endDate),
  );

  const handleCurrentPage = (nextPage: number) => {
    setCurrentPageNumber(nextPage);
    alert('페이지 이동');
  };

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
    setTotalPagesNumber(totalPages + 1);
  }, [result]);

  return { memberRecords, isLoading, totalPagesNumber, handleCurrentPage };
};

export default useMemberRecords;
