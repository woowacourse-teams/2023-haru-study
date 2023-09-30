/* eslint-disable react-hooks/exhaustive-deps */

import useFetch from '@Hooks/api/useFetch';

import { requestGetStudyMembers } from '@Apis/index';

const useStudyMembers = (studyId: string) => {
  const { result, refetch } = useFetch(() => requestGetStudyMembers(studyId));
  const participants = result?.data.participants || [];

  return { participants, refetch };
};

export default useStudyMembers;
