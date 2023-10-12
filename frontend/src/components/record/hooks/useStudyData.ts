import useFetch from '@Hooks/api/useFetch';

import { requestGetStudyInfo } from '@Apis/index';

const useStudyData = (studyId: string) => {
  const { result, isLoading } = useFetch(() => requestGetStudyInfo(studyId), {
    suspense: false,
  });

  return { studyBasicInfo: result, isLoading };
};

export default useStudyData;
