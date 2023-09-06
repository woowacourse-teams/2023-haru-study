import { useCallback, useEffect, useState } from 'react';

import { requestGetMemberContents } from '@Apis/index';

import type { PlanList } from '@Types/study';

const useStudyingForm = (studyId: string, progressId: string, cycle: number, onClickSubmit: () => Promise<void>) => {
  const [planList, setPlanList] = useState<PlanList | null>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const fetchPlanList = useCallback(async () => {
    try {
      const { data: fetchedPlanList } = await requestGetMemberContents(studyId, progressId, cycle);
      setPlanList(fetchedPlanList.content[0].plan);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      setError(error);
    }
  }, [cycle, progressId, studyId]);

  const submitForm = async () => {
    setIsSubmitLoading(true);
    try {
      await onClickSubmit();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      setError(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanList();
  }, [progressId, studyId, cycle, fetchPlanList]);

  return { planList, isSubmitLoading, error, submitForm };
};

export default useStudyingForm;
