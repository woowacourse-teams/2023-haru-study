import { useState } from 'react';

import useQuestionTextarea from '@Hooks/common/useQuestionTextarea';

import { useProgressInfo, useStudyInfo, useStudyProgressAction } from '@Contexts/StudyProgressProvider';

import { requestWriteRetrospect } from '@Apis/index';

const useRetrospectForm = () => {
  const { studyId, totalCycle } = useStudyInfo();
  const { progressId, currentCycle } = useProgressInfo();
  const { onNextStep } = useStudyProgressAction();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

  const submitForm = async () => {
    setIsSubmitLoading(true);

    try {
      await requestWriteRetrospect(studyId, progressId, {
        doneAsExpected: questionTextareaProps.doneAsExpected.value,
        experiencedDifficulty: questionTextareaProps.experiencedDifficulty.value,
        lesson: questionTextareaProps.lesson.value,
      });
      await onNextStep();
    } catch (reason) {
      if (!(reason instanceof Error)) throw reason;
      setError(reason);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  if (error) {
    alert(error.message);
  }

  return { questionTextareaProps, isInvalidForm, isLastCycle, isSubmitLoading, submitForm };
};

export default useRetrospectForm;
