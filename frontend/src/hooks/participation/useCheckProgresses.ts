import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import { MemberInfoContext } from '@Contexts/MemberInfoProvider';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestCheckProgresses } from '@Apis/index';

import { ExpiredAccessTokenError, NotExistProgressesError } from '../../errors/CustomError';

const useCheckProgresses = (isHost: boolean, errorHandler: (error: Error) => void) => {
  const { studyId } = useParams();

  const navigate = useNavigate();

  const memberInfo = useContext(MemberInfoContext);

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
      if (error instanceof Error) return errorHandler(error);
    }
  }, [errorHandler, navigate]);

  const newRequestCheckProgresses = useCallback(
    async (studyId: string, memberId: string, accessToken: string) => {
      try {
        return await requestCheckProgresses(studyId, memberId, accessToken);
      } catch (error) {
        if (error instanceof NotExistProgressesError) return setNickname('');

        if (error instanceof Error) {
          errorHandler(error);
          navigate(ROUTES_PATH.participation);
          return;
        }
      }
    },
    [errorHandler, navigate],
  );

  const checkProgresses = useCallback(async () => {
    try {
      if (isHost || !memberInfo) {
        return setNickname('');
      }

      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        const error = new Error('토큰이 없습니다. 다시 로그인 해주세요.');
        errorHandler(error);
        navigate(`${ROUTES_PATH.login}`);
        return;
      }

      const data = await requestCheckProgresses(studyId, memberInfo.id, accessToken);

      setNickname(data.progresses[0].nickname);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        const accessToken = await getAccessTokenRefresh();

        if (memberInfo && accessToken) return await newRequestCheckProgresses(studyId, memberInfo.id, accessToken);
      }

      if (error instanceof NotExistProgressesError) return setNickname('');

      if (error instanceof Error) {
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
