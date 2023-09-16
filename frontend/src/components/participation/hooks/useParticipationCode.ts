import useMutation from '@Hooks/api/useMutation';

import { requestGetAuthenticateParticipationCode } from '@Apis/index';

const useParticipationCode = (participantCode: string) => {
  const { mutate: authenticateParticipationCode, isLoading } = useMutation(() => requestGetAuthenticateParticipationCode(participantCode));

  return { authenticateParticipationCode, isLoading };
};

export default useParticipationCode;
