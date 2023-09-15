import useFetch from '@Hooks/api/useFetch';

import { requestGetMemberStudyListData } from '@Apis/index';

const useMemberRecord = (memberId: string) => {
  const { result, isLoading } = useFetch(() => requestGetMemberStudyListData(memberId));
  const studyList = result ? result.data.studies : [];

  return { studyList, isLoading };
};

export default useMemberRecord;
