import { useState } from 'react';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { requestPostRegisterProgress } from '@Apis/index';

const useRegisterProgress = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useMemberInfo();

  const registerProgress = async (nickname: string, studyId: string) => {
    if (!data) return;

    try {
      setIsLoading(true);
      await requestPostRegisterProgress(nickname, studyId, data.memberId);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, registerProgress };
};

export default useRegisterProgress;
