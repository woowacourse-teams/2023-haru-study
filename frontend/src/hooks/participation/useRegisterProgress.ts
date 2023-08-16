import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import { MemberInfoContext } from '@Contexts/MemberInfoProvider';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestRegisterProgress } from '@Apis/index';

import { APIError, ResponseError } from '@Errors/index';

const useRegisterProgress = (errorHandler: (error: Error) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const memberInfo = useContext(MemberInfoContext);

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

    try {
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        const error = new Error('토큰이 없습니다. 다시 로그인 해주세요.');
        errorHandler(error);
        navigate(`${ROUTES_PATH.login}`);
        return;
      }

      if (memberInfo) await requestRegisterProgress(nickname, studyId, memberInfo.id, accessToken);
    } catch (error) {
      if (error instanceof APIError && error.code === '1403') {
        const accessToken = await getAccessTokenRefresh();

        if (memberInfo && accessToken)
          return await newRequestRegisterProgress(nickname, studyId, memberInfo.id, accessToken);
      }

      if (error instanceof ResponseError) return errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, registerProgress };
};

export default useRegisterProgress;
