import useMutation from '@Hooks/api/useMutation';
import useQuestionTextarea from '@Hooks/common/useQuestionTextarea';

import { useProgressInfo, useStudyInfo, useStudyProgressAction } from '@Contexts/StudyProgressProvider';

import { requestWriteRetrospect } from '@Apis/index';

const useRetrospectForm = () => {
  const { studyId, totalCycle } = useStudyInfo();
  const { progressId, currentCycle } = useProgressInfo();
  const { onNextStep } = useStudyProgressAction();

  const { mutate: submitForm, isLoading: isSubmitLoading } = useMutation(async () => {
    await requestWriteRetrospect(studyId, progressId, {
      doneAsExpected: questionTextareaProps.doneAsExpected.value,
      experiencedDifficulty: questionTextareaProps.experiencedDifficulty.value,
      lesson: questionTextareaProps.lesson.value,
    });
    await onNextStep();
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
