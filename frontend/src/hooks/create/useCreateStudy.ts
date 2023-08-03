import { useState } from 'react';

import { requestCreateStudy } from '@Apis/index';

import type { StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

const useCreateStudy = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>();

  const createStudy = async (
    studyName: string,
    totalCycle: TotalCycleOptions,
    timePerCycle: StudyTimePerCycleOptions,
  ) => {
    setError(null);
    setIsLoading(true);

    try {
      return await requestCreateStudy(studyName, totalCycle, timePerCycle);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      setError(new Error('스터디 생성에 실패했습니다.'));
    } finally {
      setIsLoading(false);
    }
  };

  return { createStudy, isLoading, error };
};

export default useCreateStudy;
