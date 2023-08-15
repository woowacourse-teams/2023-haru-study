/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestGetMemberRecordContents } from '@Apis/index';

import type { MemberRecordContent } from '@Types/study';

import { ExpiredAccessTokenError } from '../../errors/CustomError';

const useMemberRecord = (studyId: string, progressId: string, options?: { errorHandler: (error: Error) => void }) => {
  const navigate = useNavigate();

  const [memberRecordContents, setMemberRecordContents] = useState<MemberRecordContent[] | null>(null);

  const isLoading = !memberRecordContents;

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
      if (error instanceof Error) return options?.errorHandler(error);
    }
  };

  const fetchMemberRecordData = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        const error = new Error('토큰이 없습니다. 다시 로그인 해주세요.');
        options?.errorHandler(error);
        navigate(ROUTES_PATH.login);
        return;
      }

      const { content } = await requestGetMemberRecordContents(studyId, progressId, accessToken);

      setMemberRecordContents(content);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        const accessToken = await getAccessTokenRefresh();

        if (accessToken) {
          const { content } = await requestGetMemberRecordContents(studyId, progressId, accessToken);

          setMemberRecordContents(content);

          return;
        }

        return;
      }

      if (error instanceof Error) return options?.errorHandler(error);
    }
  }, [progressId, studyId]);

  useEffect(() => {
    fetchMemberRecordData();
  }, [fetchMemberRecordData]);

  return { memberRecordContents, isLoading };
};

export default useMemberRecord;
