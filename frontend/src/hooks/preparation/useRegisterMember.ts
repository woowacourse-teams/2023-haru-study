import { useState } from 'react';

import { setCookie } from '@Utils/cookie';

import { requestRegisterMember } from '@Apis/index';

const useRegisterMember = (errorHandler: (message: string) => void) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resgisterMember = async (nickName: string, studyId: string) => {
    try {
      setIsLoading(true);
      const { memberId } = await requestRegisterMember(nickName, studyId);
      setCookie('memberId', memberId, 1);
    } catch (error) {
      if (!(error instanceof Error)) return error;
      errorHandler(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, resgisterMember };
};

export default useRegisterMember;
