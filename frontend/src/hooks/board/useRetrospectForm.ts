import { useState } from 'react';

import useQuestionTextarea from '@Hooks/common/useQuestionTextarea';

import { requestSubmitRetrospectForm } from '@Apis/index';

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
    try {
      await requestSubmitRetrospectForm(studyId, memberId, {
        doneAsExpected: questionTextareaProps.doneAsExpected.value,
        experiencedDifficulty: questionTextareaProps.experiencedDifficulty.value,
        lesson: questionTextareaProps.lesson.value,
      });
    } catch (error) {
      setIsSubmitLoading(false);
      if (!(error instanceof Error)) throw error;
      throw new Error('제출 과정에 에러가 발생했습니다. 다시 시도 해주세요.');
    }
    setIsSubmitLoading(false);
  };

  return { questionTextareaProps, isInvalidForm, isSubmitLoading, submitForm };
};

export default useRetrospectForm;
