import useMutation from '@Hooks/api/useMutation';

import { requestGetAuthenticateParticipationCode } from '@Apis/index';

const useParticipationCode = (participantCode: string) => {
  const { mutate, isLoading } = useMutation(() => requestGetAuthenticateParticipationCode(participantCode));

  return { mutate, isLoading };
};

export default useParticipationCode;
