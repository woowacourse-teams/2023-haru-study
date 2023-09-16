import { useParams } from 'react-router-dom';

import useFetch from '@Hooks/api/useFetch';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { requestGetCheckProgresses } from '@Apis/index';

import type { ResponseCheckProgresses } from '@Types/api';

const useCheckProgresses = () => {
  const { studyId } = useParams();

  const memberInfo = useMemberInfo();

  const { result } = useFetch<ResponseCheckProgresses>(() =>
    requestGetCheckProgresses(studyId ?? '', memberInfo?.memberId ?? ''),
  );

  if (!studyId) throw new Error('잘못된 접근입니다.');

  return { studyId, result };
};

export default useCheckProgresses;
