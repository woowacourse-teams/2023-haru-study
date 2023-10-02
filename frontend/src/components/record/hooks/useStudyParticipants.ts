/* eslint-disable react-hooks/exhaustive-deps */

import useFetch from '@Hooks/api/useFetch';

import { requestGetStudyParticipants } from '@Apis/index';

const useStudyParticipants = (studyId: string) => {
  const { result, refetch } = useFetch(() => requestGetStudyParticipants(studyId));
  const participants = result?.data.participants || [];

  return { participants, refetch };
};

export default useStudyParticipants;
