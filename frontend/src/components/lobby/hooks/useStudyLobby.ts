import useFetch from '@Hooks/api/useFetch';
import useMutation from '@Hooks/api/useMutation';

import {
  requestDeleteParticipant,
  requestGetParticipant,
  requestGetParticipantCode,
  requestPostNextStep,
} from '@Apis/index';

const useStudyLobby = (studyId: string, memberId: string, onStartStudy: () => void) => {
  const { result: participantCode } = useFetch(() => requestGetParticipantCode(studyId));
  const { result: participantInfo } = useFetch(() => requestGetParticipant(studyId, memberId));

  const { mutate: startStudy, isLoading: isStarting } = useMutation(() => requestPostNextStep(studyId), {
    onSuccess: onStartStudy,
  });
  const { mutate: exitStudy, isLoading: isExiting } = useMutation(() =>
    requestDeleteParticipant(studyId, Number(participantInfo?.participantId)),
  );

  return {
    participantCode: participantCode,
    isHost: participantInfo?.isHost ?? false,
    startStudy,
    isStarting,
    exitStudy,
    isExiting,
  };
};

export default useStudyLobby;
