import { useState } from 'react';

import { requestGetAuthenticateParticipationCode } from '@Apis/index';

const useParticipationCode = () => {
  const [isLoading, setIsLoading] = useState(false);

  const authenticateParticipationCode = async (participantCode: string) => {
    try {
      setIsLoading(true);
      return await requestGetAuthenticateParticipationCode(participantCode);
    } finally {
      setIsLoading(false);
    }
  };

  return { authenticateParticipationCode, isLoading };
};

export default useParticipationCode;
