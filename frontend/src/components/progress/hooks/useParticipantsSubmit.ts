import useMutation from '@Hooks/api/useMutation';

import { useStudyInfo } from '@Contexts/StudyProgressProvider';

import { requestGetMemberSubmitStatus } from '@Apis/index';

const useParticipantsSubmit = () => {
  const { studyId } = useStudyInfo();

  const { mutate: getParticipantSubmitStatus, isLoading: checkParticipantSubmittedLoading } = useMutation(async () => {
    const {
      data: { status },
    } = await requestGetMemberSubmitStatus(studyId);

    return status;
  });

  const checkAllParticipantSubmitted = async () => {
    const participantSubmitStatus = await getParticipantSubmitStatus();

    return participantSubmitStatus.every((status) => status.submitted);
  };

  return {
    getParticipantSubmitStatus,
    checkAllParticipantSubmitted,
    checkParticipantSubmittedLoading,
  };
};

export default useParticipantsSubmit;
