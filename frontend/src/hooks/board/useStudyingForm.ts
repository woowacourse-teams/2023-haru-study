import { useCallback, useEffect, useState } from 'react';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestGetMemberContents } from '@Apis/index';

import type { PlanList } from '@Types/study';

import { APIError } from '@Errors/index';

const useStudyingForm = (studyId: string, progressId: string, cycle: number, onClickSubmit: () => Promise<void>) => {
  const [planList, setPlanList] = useState<PlanList | null>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const refreshAccessToken = async () => {
    if (!boolCheckCookie('refreshToken')) {
      throw new Error('리프레시 토큰이 존재하지 않습니다. 다시 로그인 해주세요.');
    }

    const { accessToken } = await requestAccessTokenRefresh();
    sessionStorage.setItem('accessToken', accessToken);
  };

  const fetchPlanList = useCallback(async () => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      setError(new Error('엑세스 토큰이 존재하지 않습니다. 다시 로그인 해주세요.'));
      return;
    }

    try {
      const fetchedData = await requestGetMemberContents(accessToken, studyId, progressId, cycle);
      setPlanList(fetchedData.content[0].plan);
    } catch (error) {
      if (error instanceof APIError && error.code === '1403') {
        await refreshAccessToken();
        await fetchPlanList();
        return;
      }

      throw error;
    }
  }, [cycle, progressId, studyId]);

  const submitForm = async () => {
    setIsSubmitLoading(true);
    try {
      await onClickSubmit();
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      setError(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  useEffect(() => {
    try {
      fetchPlanList();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      setError(new Error('학습 목표를 불러오던 중 문제가 발생했습니다.'));
    }
  }, [progressId, studyId, cycle, fetchPlanList]);

  return { planList, isSubmitLoading, error, submitForm };
};

export default useStudyingForm;
