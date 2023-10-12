import useMutation from '@Hooks/api/useMutation';

import { requestGetAuthenticateParticipationCode } from '@Apis/index';

const useCheckParticipationCode = (participantCode: string) => {
  const {
    result: studyResult,
    mutate: authenticateParticipationCode,
    isLoading,
  } = useMutation(() => requestGetAuthenticateParticipationCode(participantCode));

  return { studyResult, authenticateParticipationCode, isLoading };
};

export default useCheckParticipationCode;
