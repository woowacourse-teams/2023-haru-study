import { useEffect, useState } from 'react';

import { requestGetStudyingContent, requestSubmitStudyingForm } from '@Apis/index';

import type { PlanList } from '@Types/study';

const useStudyingForm = (studyId: string, memberId: string, cycle: number) => {
  const [planList, setPlanList] = useState<PlanList | null>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchPlanList = async () => {
      const fetchedData = await requestGetStudyingContent(studyId, memberId, cycle);
      setPlanList(fetchedData);
    };

    try {
      fetchPlanList();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      setError(new Error('학습 목표를 불러오던 중 문제가 발생했습니다.'));
    }
  }, [memberId, studyId, cycle]);

  const submitForm = async () => {
    setIsSubmitLoading(true);
    try {
      await requestSubmitStudyingForm(studyId, memberId);
    } catch (error) {
      setIsSubmitLoading(false);
      if (!(error instanceof Error)) throw error;
      throw new Error('진행 과정에 에러가 발생했습니다. 다시 시도 해주세요.');
    }

    setIsSubmitLoading(false);
  };

  return { planList, isSubmitLoading, error, submitForm };
};

export default useStudyingForm;
