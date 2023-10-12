import useFetch from '@Hooks/api/useFetch';
import useMutation from '@Hooks/api/useMutation';

import { useParticipantInfo, useStudyInfo, useStudyProgressAction } from '@Contexts/StudyProgressProvider';

import { requestGetMemberPlan } from '@Apis/index';

const useStudyingForm = () => {
  const { studyId, currentCycle } = useStudyInfo();
  const { participantId } = useParticipantInfo();
  const { moveToNextStep } = useStudyProgressAction();

  const { result: planList } = useFetch(() => requestGetMemberPlan(studyId, participantId, currentCycle));
  const { mutate: submitForm, isLoading: isSubmitLoading } = useMutation(moveToNextStep);

  return { planList, isSubmitLoading, submitForm };
};

export default useStudyingForm;
