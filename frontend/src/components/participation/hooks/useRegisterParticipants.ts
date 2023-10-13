import useMutation from '@Hooks/api/useMutation';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { requestPostRegisterParticipants } from '@Apis/index';

const useRegisterParticipants = (nickname: string, studyId: string) => {
  const memberInfo = useMemberInfo();

  const { isLoading, mutate: registerParticipants } = useMutation(() =>
    requestPostRegisterParticipants(nickname, studyId, memberInfo!.memberId),
  );

  return { isLoading, registerParticipants };
};

export default useRegisterParticipants;
