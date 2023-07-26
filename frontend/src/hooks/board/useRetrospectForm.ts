import { useState } from 'react';

import useQuestionTextarea from '@Hooks/useQuestionTextarea';

const useRetrospectForm = (studyId: string, memberId: string) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const questionTextareaProps = {
    doneAsExpected: useQuestionTextarea({
      minLength: 10,
      maxLength: 500,
      required: true,
    }),
    experiencedDifficulty: useQuestionTextarea({
      minLength: 10,
      maxLength: 500,
      required: true,
    }),
    lesson: useQuestionTextarea({
      minLength: 10,
      maxLength: 500,
      required: true,
    }),
  } as const;

  const isInvalidForm = !!(
    questionTextareaProps.doneAsExpected.errorMessage ||
    questionTextareaProps.experiencedDifficulty.errorMessage ||
    questionTextareaProps.lesson.errorMessage
  );

  const submitForm = async () => {
    setIsSubmitLoading(true);
    const response = await fetch(`/api/studies/${studyId}/members/${memberId}/content/retrospects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        doneAsExpected: questionTextareaProps.doneAsExpected.value,
        experiencedDifficulty: questionTextareaProps.experiencedDifficulty.value,
        lesson: questionTextareaProps.lesson.value,
      }),
    });
    setIsSubmitLoading(false);

    if (!response.ok) {
      throw new Error('제출 과정에 에러가 발생했습니다. 다시 시도 해주세요.');
    }
  };

  return { questionTextareaProps, isInvalidForm, isSubmitLoading, submitForm };
};

export default useRetrospectForm;
