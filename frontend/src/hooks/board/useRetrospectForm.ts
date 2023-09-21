import { useState } from 'react';

import useQuestionTextarea from '@Hooks/common/useQuestionTextarea';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestWriteRetrospect } from '@Apis/index';

import { APIError } from '@Errors/index';

const useRetrospectForm = (studyId: string, progressId: string, onClickSubmit: () => Promise<void>) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

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
      await requestWriteRetrospect(accessToken, studyId, progressId, {
        doneAsExpected: questionTextareaProps.doneAsExpected.value,
        experiencedDifficulty: questionTextareaProps.experiencedDifficulty.value,
        lesson: questionTextareaProps.lesson.value,
      });
      await onClickSubmit();
    } catch (error) {
      if (error instanceof APIError && error.code === 1403) {
        await refreshAccessToken();
        await submitForm();
        return;
      }

      throw error;
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return { questionTextareaProps, isInvalidForm, isSubmitLoading, submitForm };
};

export default useRetrospectForm;
