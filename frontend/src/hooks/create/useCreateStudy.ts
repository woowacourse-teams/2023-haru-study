import { useState } from 'react';

import { requestPostCreateStudy } from '@Apis/index';

import type { StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

const useCreateStudy = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createStudy = async (
    studyName: string,
    totalCycle: TotalCycleOptions,
    timePerCycle: StudyTimePerCycleOptions,
  ) => {
    try {
      setIsLoading(true);
      const { studyId, response } = await requestPostCreateStudy(studyName, totalCycle, timePerCycle);
      const { data } = response;
      return { studyId, data };
    } finally {
      setIsLoading(false);
    }
  };

  return { createStudy, isLoading };
};

export default useCreateStudy;
