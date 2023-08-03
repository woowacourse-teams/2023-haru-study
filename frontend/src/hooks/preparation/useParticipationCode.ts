import { useState } from 'react';

import { getCookie } from '@Utils/cookie';

import { requestAuthenticateParticipationCode } from '@Apis/index';

const useParticipationCode = (errorHandler: (message: string) => void) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authenticatePartcipationCode = async (participantCode: string) => {
    setIsLoading(true);

    try {
      const memberId = Number(getCookie('memberId'));
      return await requestAuthenticateParticipationCode(participantCode, memberId);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      errorHandler(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { authenticatePartcipationCode, isLoading };
};

export default useParticipationCode;
