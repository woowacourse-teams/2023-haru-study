import { useParams } from 'react-router-dom';

import useFetch from '@Hooks/api/useFetch';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { requestGetCheckParticipants } from '@Apis/index';

import type { ResponseCheckParticipants } from '@Types/api';

const useCheckProgresses = () => {
  const { studyId } = useParams();

  const memberInfo = useMemberInfo();

  const { result } = useFetch<ResponseCheckParticipants>(() =>
    requestGetCheckParticipants(studyId ?? '', memberInfo?.memberId ?? ''),
  );

  if (!studyId) throw new Error('잘못된 접근입니다.');

  return { studyId, result };
};

export default useCheckProgresses;
