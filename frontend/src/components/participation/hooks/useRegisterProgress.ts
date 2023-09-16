import useMutation from '@Hooks/api/useMutation';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { requestPostRegisterProgress } from '@Apis/index';

const useRegisterProgress = (nickname: string, studyId: string) => {
  const { data } = useMemberInfo();

  const { isLoading, mutate: registerProgress } = useMutation(() => requestPostRegisterProgress(nickname, studyId, data!.memberId));

  return { isLoading, registerProgress };
};

export default useRegisterProgress;
