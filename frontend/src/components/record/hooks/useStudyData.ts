import useCacheFetch from '@Hooks/api/useCacheFetch';

import { requestGetStudyInfo } from '@Apis/index';

const useStudyData = (studyId: string) => {
  const { result, isLoading } = useCacheFetch(() => requestGetStudyInfo(studyId), {
    cacheKey: ['studyData', studyId],
    cacheTime: 24 * 60 * 60 * 1000,
    enabled: true,
  });

  return { studyBasicInfo: result, isLoading };
};

export default useStudyData;
