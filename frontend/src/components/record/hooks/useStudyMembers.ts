/* eslint-disable react-hooks/exhaustive-deps */

import useFetch from '@Hooks/api/useFetch';

import { requestGetStudyMembers } from '@Apis/index';

const useStudyMembers = (studyId: string) => {
  const { result, refetch } = useFetch(() => requestGetStudyMembers(studyId));

  const memberProgresses = result ? result.data.progresses : [];

  return { memberProgresses, refetch };
};

export default useStudyMembers;
