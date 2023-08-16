import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestAuthenticateParticipationCode } from '@Apis/index';

import { APIError, ResponseError } from '@Errors/index';

const useParticipationCode = (errorHandler: (error: Error) => void) => {
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
      if (error instanceof ResponseError || error instanceof APIError) return errorHandler(error);
    }
  };

  const newRequestAuthenticateParticipationCode = async (participantCode: string, accessToken: string) => {
    try {
      return await requestAuthenticateParticipationCode(participantCode, accessToken);
    } catch (error) {
      if (error instanceof ResponseError || error instanceof APIError) return errorHandler(error);
    }
  };

  const authenticateParticipationCode = async (participantCode: string) => {
    setIsLoading(true);

    try {
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        const error = new Error('토큰이 없습니다. 다시 로그인 해주세요.');
        errorHandler(error);
        navigate(`${ROUTES_PATH.login}`);
        return;
      }

      return await requestAuthenticateParticipationCode(participantCode, accessToken);
    } catch (error) {
      if (error instanceof APIError) {
        if (error.code === '1403') {
          const accessToken = await getAccessTokenRefresh();

          if (accessToken) return await newRequestAuthenticateParticipationCode(participantCode, accessToken);
        }

        return errorHandler(error);
      }

      if (error instanceof ResponseError) return errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { authenticateParticipationCode, isLoading };
};

export default useParticipationCode;
