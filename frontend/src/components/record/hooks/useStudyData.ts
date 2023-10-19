import useCacheMutation from '@Hooks/api/useCacheMutation';

import { requestGetStudyInfo } from '@Apis/index';

const useStudyData = (studyId: string) => {
  const { result, isLoading } = useCacheMutation(() => requestGetStudyInfo(studyId), {
    queryKey: ['studyData', studyId],
    cacheTime: 24 * 60 * 60 * 1000,
  });

  return { studyBasicInfo: result, isLoading };
};

export default useStudyData;
