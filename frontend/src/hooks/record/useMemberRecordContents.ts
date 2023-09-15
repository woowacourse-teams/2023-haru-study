import useFetch from '@Hooks/api/useFetch';

import { requestGetMemberRecordContents } from '@Apis/index';

const useMemberRecordContents = (studyId: string, progressId: string) => {
  const { result } = useFetch(() => requestGetMemberRecordContents(studyId, progressId));
  const memberRecordContents = result ? result.data.content : [];

  return { memberRecordContents };
};

export default useMemberRecordContents;
