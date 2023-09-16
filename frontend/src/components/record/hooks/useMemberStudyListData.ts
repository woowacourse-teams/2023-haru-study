import useFetch from '@Hooks/api/useFetch';

import { requestGetMemberStudyListData } from '@Apis/index';

const useMemberStudyListData = (memberId: string) => {
  const { result, isLoading } = useFetch(() => requestGetMemberStudyListData(memberId));
  const studyList = result?.data.studies || [];

  return { studyList, isLoading };
};

export default useMemberStudyListData;