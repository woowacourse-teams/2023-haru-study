import { useState } from 'react';

import useQuestionTextarea from '@Hooks/common/useQuestionTextarea';

import { useProgressInfo, useStudyInfo, useStudyProgressAction } from '@Contexts/StudyProgressProvider';

import { requestWritePlan } from '@Apis/index';

const usePlanningForm = () => {
  const { studyId } = useStudyInfo();
  const { progressId } = useProgressInfo();
  const { onNextStep } = useStudyProgressAction();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const questionTextareaProps = {
    toDo: useQuestionTextarea({
      minLength: 10,
      maxLength: 500,
      required: true,
    }),
    completionCondition: useQuestionTextarea({
      minLength: 10,
      maxLength: 500,
      required: true,
    }),
    expectedProbability: useQuestionTextarea({
      maxLength: 500,
    }),
    expectedDifficulty: useQuestionTextarea({
      maxLength: 500,
    }),
    whatCanYouDo: useQuestionTextarea({
      maxLength: 500,
    }),
  } as const;

  const isInvalidForm = !!(
    questionTextareaProps.toDo.errorMessage ||
    questionTextareaProps.completionCondition.errorMessage ||
    questionTextareaProps.expectedDifficulty.errorMessage ||
    questionTextareaProps.expectedProbability.errorMessage ||
    questionTextareaProps.whatCanYouDo.errorMessage
  );

  const submitForm = async () => {
    setIsSubmitLoading(true);

    try {
      await requestWritePlan(studyId, progressId, {
        toDo: questionTextareaProps.toDo.value,
        completionCondition: questionTextareaProps.completionCondition.value,
        expectedProbability: questionTextareaProps.expectedProbability.value,
        expectedDifficulty: questionTextareaProps.expectedDifficulty.value,
        whatCanYouDo: questionTextareaProps.whatCanYouDo.value,
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

  return { questionTextareaProps, isSubmitLoading, isInvalidForm, submitForm };
};

export default usePlanningForm;
