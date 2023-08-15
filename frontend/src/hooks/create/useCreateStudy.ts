import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestCreateStudy } from '@Apis/index';

import type { StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

import { ExpiredAccessTokenError } from '../../errors/CustomError';

const useCreateStudy = (errorHandler: (error: Error) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const getAccessTokenRefresh = async () => {
    try {
      const hasRefreshToken = boolCheckCookie('refreshToken');

      if (!hasRefreshToken) {
        navigate(ROUTES_PATH.login);
        return;
      }

      const { accessToken } = await requestAccessTokenRefresh();

      sessionStorage.setItem('accessToken', accessToken);

      return accessToken;
    } catch (error) {
      if (error instanceof Error) return errorHandler(error);
    }
  };

  const newRequestCreateStudy = async (
    studyName: string,
    totalCycle: TotalCycleOptions,
    timePerCycle: StudyTimePerCycleOptions,
    accessToken: string,
  ) => {
    try {
      return await requestCreateStudy(studyName, totalCycle, timePerCycle, accessToken);
    } catch (error) {
      if (error instanceof Error) return errorHandler(error);
    }
  };

  const createStudy = async (
    studyName: string,
    totalCycle: TotalCycleOptions,
    timePerCycle: StudyTimePerCycleOptions,
  ) => {
    setIsLoading(true);

    try {
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        const error = new Error('토큰이 없습니다. 다시 로그인 해주세요.');
        errorHandler(error);
        navigate(`${ROUTES_PATH.login}`);
        return;
      }

      return await requestCreateStudy(studyName, totalCycle, timePerCycle, accessToken);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        const accessToken = await getAccessTokenRefresh();

        if (accessToken) return await newRequestCreateStudy(studyName, totalCycle, timePerCycle, accessToken);
      }
      if (error instanceof Error) return errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { createStudy, isLoading };
};

export default useCreateStudy;
