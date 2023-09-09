import useMutation from '@Hooks/api/useMutation';

import type { HttpResponse } from '@Utils/Http';

import { requestPostCreateStudy } from '@Apis/index';

import type { ResponseCreateStudy } from '@Types/api';
import type { StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

const useCreateStudy = (
  studyName: string,
  totalCycle: TotalCycleOptions | null,
  timePerCycle: StudyTimePerCycleOptions | null,
) => {
  const { mutate, isLoading } = useMutation<{ studyId: string; response: HttpResponse<ResponseCreateStudy> }>(() =>
    requestPostCreateStudy(studyName, totalCycle, timePerCycle),
  );

  return { mutate, isLoading };
};

export default useCreateStudy;
