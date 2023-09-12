import { useParams } from 'react-router-dom';

import useFetch from '@Hooks/api/useFetch';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { requestGetCheckProgresses } from '@Apis/index';

import type { ResponseCheckProgresses } from '@Types/api';

const useCheckProgresses = () => {
  const { studyId } = useParams();

  const { data: memberInfo } = useMemberInfo();

  const result = useFetch<ResponseCheckProgresses>(() =>
    requestGetCheckProgresses(studyId ?? '', memberInfo?.memberId ?? ''),
  );

  if (!studyId) {
    const error = new Error('잘못된 접근입니다.');
    throw error;
  }

  return { studyId, result };
};

export default useCheckProgresses;
