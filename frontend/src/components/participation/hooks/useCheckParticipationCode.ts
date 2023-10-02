import useMutation from '@Hooks/api/useMutation';

import { requestGetAuthenticateParticipationCode } from '@Apis/index';

const useCheckParticipationCode = (participantCode: string) => {
  const { mutate: authenticateParticipationCode, isLoading } = useMutation(() => requestGetAuthenticateParticipationCode(participantCode));

  return { authenticateParticipationCode, isLoading };
};

export default useCheckParticipationCode;
