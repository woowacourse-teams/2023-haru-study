import { useState } from 'react';

import { setCookie } from '@Utils/cookie';

import { requestRegisterMember } from '@Apis/index';

const useRegisterMember = (errorHandler: (error: Error) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const registerMember = async (nickName: string, studyId: string) => {
    try {
      setIsLoading(true);
      const { memberId } = await requestRegisterMember(nickName, studyId);
      setCookie('memberId', memberId, 1);
    } catch (error) {
      if (!(error instanceof Error)) return error;
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, registerMember };
};

export default useRegisterMember;