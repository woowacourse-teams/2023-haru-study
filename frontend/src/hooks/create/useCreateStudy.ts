import { useState } from 'react';

import { requestCreateStudy } from '@Apis/index';

import type { StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

const useCreateStudy = (errorHandler: (error: Error) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const createStudy = async (
    studyName: string,
    totalCycle: TotalCycleOptions,
    timePerCycle: StudyTimePerCycleOptions,
  ) => {
    setIsLoading(true);

    try {
      return await requestCreateStudy(studyName, totalCycle, timePerCycle);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { createStudy, isLoading };
};

export default useCreateStudy;
