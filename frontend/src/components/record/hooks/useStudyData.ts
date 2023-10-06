import useFetch from '@Hooks/api/useFetch';

import { requestGetOneStudyData } from '@Apis/index';

const useStudyData = (studyId: string) => {
  const { result, isLoading } = useFetch(() => requestGetOneStudyData(studyId), {
    suspense: false,
  });

  return { studyBasicInfo: result, isLoading };
};

export default useStudyData;
