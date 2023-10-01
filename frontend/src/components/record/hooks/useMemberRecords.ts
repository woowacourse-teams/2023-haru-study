import useFetch from '@Hooks/api/useFetch';

import format from '@Utils/format';

import { requestGetMemberRecords } from '@Apis/index';

const useMemberRecords = (memberId: string) => {
  const { result, isLoading } = useFetch(() => requestGetMemberRecords(memberId));

  const responseMemberRecords = result?.data.studies || [];

  const memberRecords = responseMemberRecords.map((record) => {
    const createdDateTime = format.date(new Date(record.createdDateTime));
    return { ...record, createdDateTime };
  });

  return { memberRecords, isLoading };
};

export default useMemberRecords;
