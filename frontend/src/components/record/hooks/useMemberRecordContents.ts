import useFetch from '@Hooks/api/useFetch';

import { requestGetMemberRecordContents } from '@Apis/index';

const useMemberRecordContents = (studyId: string, progressId: string) => {
  const { result, isLoading } = useFetch(() => requestGetMemberRecordContents(studyId, progressId), {
    suspense: false,
  });
  const memberRecordContents = result?.data.content || [];

  return { memberRecordContents, isLoading };
};

export default useMemberRecordContents;
