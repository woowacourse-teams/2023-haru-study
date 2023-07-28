import { useState } from 'react';

import useQuestionTextarea from '@Hooks/useQuestionTextarea';

const usePlanningForm = (studyId: string, memberId: string) => {
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
    const response = await fetch(`/api/studies/${studyId}/members/${memberId}/content/plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toDo: questionTextareaProps.toDo.value,
        completionCondition: questionTextareaProps.completionCondition.value,
        expectedProbability: questionTextareaProps.expectedProbability.value,
        expectedDifficulty: questionTextareaProps.expectedDifficulty.value,
        whatCanYouDo: questionTextareaProps.whatCanYouDo.value,
      }),
    });

    setIsSubmitLoading(false);

    if (!response.ok) {
      throw new Error('제출 과정에 에러가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return { questionTextareaProps, isSubmitLoading, isInvalidForm, submitForm };
};

export default usePlanningForm;
