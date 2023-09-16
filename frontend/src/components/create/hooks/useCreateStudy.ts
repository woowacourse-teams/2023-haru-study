import useMutation from '@Hooks/api/useMutation';

import { requestPostCreateStudy } from '@Apis/index';

import type { ResponseCreateStudy } from '@Types/api';
import type { StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

type CreateStudyResult = {
  studyId: string;
  data: ResponseCreateStudy;
};

const useCreateStudy = (
  studyName: string,
  totalCycle: TotalCycleOptions | null,
  timePerCycle: StudyTimePerCycleOptions | null,
) => {
  const { mutate: createStudy, isLoading } = useMutation<CreateStudyResult>(() =>
    requestPostCreateStudy(studyName, totalCycle, timePerCycle),
  );

  return { createStudy, isLoading };
};

export default useCreateStudy;