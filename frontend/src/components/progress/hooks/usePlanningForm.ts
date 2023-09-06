import { useState } from 'react';

import useQuestionTextarea from '@Hooks/common/useQuestionTextarea';

import { requestWritePlan } from '@Apis/index';

const usePlanningForm = (studyId: string, progressId: string, onClickSubmit: () => Promise<void>) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

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
      await onClickSubmit();
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return { questionTextareaProps, isSubmitLoading, isInvalidForm, submitForm };
};

export default usePlanningForm;
