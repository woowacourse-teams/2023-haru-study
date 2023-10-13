import useFetch from '@Hooks/api/useFetch';

import { useParticipantInfo, useStudyInfo } from '@Contexts/StudyProgressProvider';

import { requestGetMemberPlan } from '@Apis/index';

const useStudyingForm = () => {
  const { studyId, currentCycle } = useStudyInfo();
  const { participantId } = useParticipantInfo();

  const { result: planList } = useFetch(() => requestGetMemberPlan(studyId, participantId, currentCycle));

  return { planList };
};

export default useStudyingForm;
