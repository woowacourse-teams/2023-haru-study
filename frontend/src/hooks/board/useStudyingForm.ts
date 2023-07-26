import { useEffect, useState } from 'react';

import { PlanList } from '@Types/study';

const useStudyingForm = (studyId: string, memberId: string, cycle: number) => {
  const [planList, setPlanList] = useState<PlanList | null>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    try {
      fetch(`/api/studies/${studyId}/members/${memberId}/content/plans?cycle=${cycle}`)
        .then((res) => res.json())
        .then((data: PlanList) => setPlanList(data))
        .catch(() => {
          throw new Error('학습 목표를 불러오던 중 문제가 발생했습니다.');
        });
    } catch (error) {
      if (!(error instanceof Error)) return;
      setError(error);
    }
  }, [memberId, studyId, cycle]);

  const submitForm = async () => {
    setIsSubmitLoading(true);
    const response = await fetch(`/api/studies/${studyId}/members/${memberId}/next-step`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsSubmitLoading(false);

    if (!response.ok) {
      throw new Error('진행 과정에 에러가 발생했습니다. 다시 시도 해주세요.');
    }
  };

  return { planList, isSubmitLoading, error, submitForm };
};

export default useStudyingForm;
