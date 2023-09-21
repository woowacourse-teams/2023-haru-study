import useFetch from '@Hooks/api/useFetch';
import useMutation from '@Hooks/api/useMutation';

import { useProgressInfo, useStudyInfo, useStudyProgressAction } from '@Contexts/StudyProgressProvider';

import { requestGetMemberContents } from '@Apis/index';

const useStudyingForm = () => {
  const { studyId } = useStudyInfo();
  const { progressId, currentCycle } = useProgressInfo();
  const { onNextStep } = useStudyProgressAction();

  const { result: planList } = useFetch(() => requestGetMemberContents(studyId, progressId, currentCycle));
  const { mutate: submitForm, isLoading: isSubmitLoading } = useMutation(() => onNextStep());

  return { planList, isSubmitLoading, submitForm };
};

export default useStudyingForm;
