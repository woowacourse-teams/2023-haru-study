import { useState } from 'react';

import { requestAuthenticateParticipationCode } from '@Apis/index';

const useParticipationCode = (errorHandler: (message: string) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const authenticateParticipationCode = async (participantCode: string) => {
    setIsLoading(true);

    try {
      return await requestAuthenticateParticipationCode(participantCode);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      errorHandler(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { authenticateParticipationCode, isLoading };
};

export default useParticipationCode;
