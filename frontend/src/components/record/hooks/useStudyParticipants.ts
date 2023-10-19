/* eslint-disable react-hooks/exhaustive-deps */
import useCacheFetch from '@Hooks/api/useCacheFetch';

import { requestGetStudyParticipants } from '@Apis/index';

const useStudyParticipants = (studyId: string) => {
  const { result, isLoading } = useCacheFetch(() => requestGetStudyParticipants(studyId), {
    cacheKey: ['participants', studyId],
    cacheTime: 24 * 60 * 60 * 1000,
    enabled: true,
  });
  const participants = result?.data.participants || [];

  return { participants, isLoading };
};

export default useStudyParticipants;
