/* eslint-disable react-hooks/exhaustive-deps */
import useCacheMutation from '@Hooks/api/useCacheMutation';

import { requestGetStudyParticipants } from '@Apis/index';

const useStudyParticipants = (studyId: string) => {
  const {
    result,
    mutate: refetch,
    isLoading,
  } = useCacheMutation(() => requestGetStudyParticipants(studyId), {
    queryKey: ['participants', studyId],
    cacheTime: 24 * 60 * 60 * 1000,
  });
  const participants = result?.data.participants || [];

  return { participants, refetch, isLoading };
};

export default useStudyParticipants;
