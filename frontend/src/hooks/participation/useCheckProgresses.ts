import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestCheckProgresses } from '@Apis/index';

import { APIError, ResponseError } from '../../errors';

const useCheckProgresses = (isHost: boolean, errorHandler: (error: Error) => void) => {
  const { studyId } = useParams();

  const navigate = useNavigate();

  const { data: memberInfo } = useMemberInfo();

  const [nickname, setNickname] = useState<string | null>(null);

  const restart = () => setNickname('');

  if (!studyId) {
    const error = new Error('잘못된 접근입니다.');
    errorHandler(error);
    throw error;
  }

  const getAccessTokenRefresh = useCallback(async () => {
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
  }, [errorHandler, navigate]);

  const newRequestCheckProgresses = useCallback(
    async (studyId: string, memberId: string, accessToken: string) => {
      try {
        return await requestCheckProgresses(studyId, memberId, accessToken);
      } catch (error) {
        if (error instanceof APIError) {
          if (error.code === '1201') return setNickname('');

          errorHandler(error);
          navigate(ROUTES_PATH.participation);
          return;
        }

        if (error instanceof ResponseError) {
          errorHandler(error);
          navigate(ROUTES_PATH.participation);
          return;
        }
      }
    },
    [errorHandler, navigate],
  );

  const checkProgresses = useCallback(async () => {
    if (isHost || !memberInfo) {
      return setNickname('');
    }

    try {
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        const error = new Error('토큰이 없습니다. 다시 로그인 해주세요.');
        errorHandler(error);
        navigate(`${ROUTES_PATH.login}`);
        return;
      }

      const data = await requestCheckProgresses(studyId, memberInfo.memberId, accessToken);

      setNickname(data.progresses[0].nickname);
    } catch (error) {
      if (error instanceof APIError) {
        if (error.code === '1403') {
          const accessToken = await getAccessTokenRefresh();

          if (accessToken) return await newRequestCheckProgresses(studyId, memberInfo.memberId, accessToken);
        }
        if (error.code === '1201') return setNickname('');

        errorHandler(error);
        navigate(ROUTES_PATH.participation);
        return;
      }

      if (error instanceof ResponseError) {
        errorHandler(error);
        navigate(ROUTES_PATH.participation);
        return;
      }
    }
  }, [studyId, isHost, memberInfo, errorHandler, navigate, getAccessTokenRefresh, newRequestCheckProgresses]);

  useEffect(() => {
    checkProgresses();
  }, [checkProgresses, isHost, memberInfo, errorHandler]);

  return { studyId, nickname, restart };
};

export default useCheckProgresses;
