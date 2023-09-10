import { useCallback, useEffect, useState } from 'react';

import { useProgressInfo, useStudyInfo, useStudyProgressAction } from '@Contexts/StudyProgressProvider';

import { requestGetMemberContents } from '@Apis/index';

import type { PlanList } from '@Types/study';

const useStudyingForm = () => {
  const { studyId } = useStudyInfo();
  const { progressId, currentCycle } = useProgressInfo();
  const { onNextStep } = useStudyProgressAction();

  const [planList, setPlanList] = useState<PlanList | null>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlanList = useCallback(async () => {
    try {
      const { data: fetchedPlanList } = await requestGetMemberContents(studyId, progressId, currentCycle);
      setPlanList(fetchedPlanList.content[0].plan);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      setError(error);
    }
  }, [currentCycle, progressId, studyId]);

  const submitForm = async () => {
    setIsSubmitLoading(true);
    try {
      await onNextStep();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      setError(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanList();
  }, [progressId, studyId, currentCycle, fetchPlanList]);

  if (error) {
    alert(error.message);
  }

  return { planList, isSubmitLoading, submitForm };
};

export default useStudyingForm;
