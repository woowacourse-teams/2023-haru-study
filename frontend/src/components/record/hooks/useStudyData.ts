import useFetch from '@Hooks/api/useFetch';

import { requestGetStudyData } from '@Apis/index';

const useStudyData = (studyId: string) => {
  const { result, isLoading } = useFetch(() => requestGetStudyData(studyId), {
    suspense: false,
  });
  const studyBasicInfo = result?.data;

  return { studyBasicInfo, isLoading };
};

export default useStudyData;
