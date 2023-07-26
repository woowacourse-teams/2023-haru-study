import { useEffect, useState } from 'react';

import { PlanList } from '@Types/study';

const useStudyingForm = () => {
  const [planList, setPlanList] = useState<PlanList | null>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  useEffect(() => {
    fetch('/api/studies/123/members/1/content/plans')
      .then((res) => res.json())
      .then((data: PlanList) => setPlanList(data));
  }, []);

  const submitForm = async () => {
    setIsSubmitLoading(true);
    const response = await fetch('/api/studies/123/members/1/next-step', { method: 'POST' });
    setIsSubmitLoading(false);

    if (!response.ok) {
      throw new Error('진행 과정에 에러가 발생했습니다. 다시 시도 해주세요.');
    }
  };

  return { planList, isSubmitLoading, submitForm };
};

export default useStudyingForm;
