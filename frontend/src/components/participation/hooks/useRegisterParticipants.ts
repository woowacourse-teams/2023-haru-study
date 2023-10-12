import useMutation from '@Hooks/api/useMutation';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { requestPostRegisterParticipants } from '@Apis/index';

const useRegisterParticipants = (nickname: string, studyId: string) => {
  const memberInfo = useMemberInfo();

  const {
    result: registerResult,
    isLoading,
    mutate: registerParticipants,
  } = useMutation(() => requestPostRegisterParticipants(nickname, studyId, memberInfo!.memberId));

  return { registerResult, isLoading, registerParticipants };
};

export default useRegisterParticipants;
