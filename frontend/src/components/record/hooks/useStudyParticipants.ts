/* eslint-disable react-hooks/exhaustive-deps */
import useCacheFetch from '@Hooks/api/useCacheFetch';

import { requestGetStudyParticipants } from '@Apis/index';

const useStudyParticipants = (studyId: string) => {
  const {
    result,
    mutate: refetch,
    isLoading,
  } = useCacheFetch(() => requestGetStudyParticipants(studyId), {
    cacheKey: ['participants', studyId],
    cacheTime: 24 * 60 * 60 * 1000,
  });
  const participants = result?.data.participants || [];

  return { participants, refetch, isLoading };
};

export default useStudyParticipants;
