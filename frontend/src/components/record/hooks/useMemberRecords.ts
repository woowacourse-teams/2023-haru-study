import useFetch from '@Hooks/api/useFetch';

import { requestGetMemberRecords } from '@Apis/index';

const useMemberRecords = (memberId: string) => {
  const { result, isLoading } = useFetch(() => requestGetMemberRecords(memberId));
  const memberRecords = result?.data.studies || [];

  return { memberRecords, isLoading };
};

export default useMemberRecords;
