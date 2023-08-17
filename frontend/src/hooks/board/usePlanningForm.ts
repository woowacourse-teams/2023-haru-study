import { useState } from 'react';

import useQuestionTextarea from '@Hooks/common/useQuestionTextarea';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestWritePlan } from '@Apis/index';

import { APIError } from '@Errors/index';

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

  const refreshAccessToken = async () => {
    if (!boolCheckCookie('refreshToken')) {
      throw new Error('리프레시 토큰이 존재하지 않습니다. 다시 로그인 해주세요.');
    }

    const { accessToken } = await requestAccessTokenRefresh();
    sessionStorage.setItem('accessToken', accessToken);
  };

  const submitForm = async () => {
    setIsSubmitLoading(true);

    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('엑세스 토큰이 존재하지 않습니다. 다시 로그인 해주세요.');
    }

    try {
      await requestWritePlan(accessToken, studyId, progressId, {
        toDo: questionTextareaProps.toDo.value,
        completionCondition: questionTextareaProps.completionCondition.value,
        expectedProbability: questionTextareaProps.expectedProbability.value,
        expectedDifficulty: questionTextareaProps.expectedDifficulty.value,
        whatCanYouDo: questionTextareaProps.whatCanYouDo.value,
      });
      await onClickSubmit();
    } catch (error) {
      if (error instanceof APIError && error.code === '1403') {
        await refreshAccessToken();
        await submitForm();
        return;
      }

      throw error;
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return { questionTextareaProps, isSubmitLoading, isInvalidForm, submitForm };
};

export default usePlanningForm;
