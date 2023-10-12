import useMutation from '@Hooks/api/useMutation';
import useQuestionTextarea from '@Hooks/common/useQuestionTextarea';

import { useParticipantInfo, useStudyInfo, useStudyProgressAction } from '@Contexts/StudyProgressProvider';

import { requestWriteRetrospect } from '@Apis/index';

const useRetrospectForm = () => {
  const { studyId, totalCycle, currentCycle } = useStudyInfo();
  const { participantId } = useParticipantInfo();
  const { moveToNextStep } = useStudyProgressAction();

  const { mutate: submitForm, isLoading: isSubmitLoading } = useMutation(async () => {
    await requestWriteRetrospect(studyId, participantId, {
      doneAsExpected: questionTextareaProps.doneAsExpected.value,
      experiencedDifficulty: questionTextareaProps.experiencedDifficulty.value,
      lesson: questionTextareaProps.lesson.value,
    });
    await moveToNextStep();
  });

  const questionTextareaProps = {
    doneAsExpected: useQuestionTextarea({
      minLength: 10,
      maxLength: 500,
      required: true,
    }),
    experiencedDifficulty: useQuestionTextarea({
      maxLength: 500,
    }),
    lesson: useQuestionTextarea({
      maxLength: 500,
    }),
  } as const;

  const isInvalidForm = !!(
    questionTextareaProps.doneAsExpected.errorMessage ||
    questionTextareaProps.experiencedDifficulty.errorMessage ||
    questionTextareaProps.lesson.errorMessage
  );

  const isLastCycle = totalCycle === currentCycle;

  return { questionTextareaProps, isInvalidForm, isLastCycle, isSubmitLoading, submitForm };
};

export default useRetrospectForm;
