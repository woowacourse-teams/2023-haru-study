import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestRegisterProgress } from '@Apis/index';

import { APIError, ResponseError } from '@Errors/index';

const useRegisterProgress = (errorHandler: (error: Error) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useMemberInfo();

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

  const newRequestRegisterProgress = async (
    nickname: string,
    studyId: string,
    memberId: string,
    accessToken: string,
  ) => {
    try {
      await requestRegisterProgress(nickname, studyId, memberId, accessToken);
    } catch (error) {
      if (error instanceof ResponseError || error instanceof APIError) return errorHandler(error);
    }
  };

  const registerProgress = async (nickname: string, studyId: string) => {
    setIsLoading(true);

    if (!data) return;

    try {
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        const error = new Error('토큰이 없습니다. 다시 로그인 해주세요.');
        errorHandler(error);
        navigate(`${ROUTES_PATH.login}`);
        return;
      }


      await requestRegisterProgress(nickname, studyId, data.memberId, accessToken);

    } catch (error) {
      if (error instanceof APIError && error.code === '1403') {
        const accessToken = await getAccessTokenRefresh();

        if (accessToken) return await newRequestRegisterProgress(nickname, studyId, data.memberId, accessToken);

      }

      if (error instanceof ResponseError) return errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, registerProgress };
};

export default useRegisterProgress;
