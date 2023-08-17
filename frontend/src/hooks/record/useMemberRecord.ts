/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestGetMemberStudyListData } from '@Apis/index';

import type { StudyBasicInfo } from '@Types/study';

import { APIError, ResponseError } from '@Errors/index';

const useMemberRecord = (options: { errorHandler: (error: Error) => void }) => {
  const navigate = useNavigate();

  const { data } = useMemberInfo();
  const [studyList, setStudyList] = useState<StudyBasicInfo[] | null>(null);
  const isLoading = !studyList;

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
      if (error instanceof Error) return options?.errorHandler(error);
    }
  }, [navigate, options]);

  const fetchMemberRecord = useCallback(async () => {
    if (!data) return;

    try {
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        const error = new Error('토큰이 없습니다. 다시 로그인 해주세요.');
        options?.errorHandler(error);
        navigate(ROUTES_PATH.login);
        return;
      }

      const { studies } = await requestGetMemberStudyListData(data.memberId, accessToken);

      setStudyList(studies);
    } catch (error) {
      if (error instanceof APIError && error.code === 1403) {
        const accessToken = await getAccessTokenRefresh();

        if (!accessToken) return;

        const { studies } = await requestGetMemberStudyListData(data.memberId, accessToken);

        setStudyList(studies);
      }

      if (error instanceof ResponseError) return options?.errorHandler(error);
    }
  }, [data, navigate]);

  useEffect(() => {
    fetchMemberRecord();
  }, [fetchMemberRecord]);

  return { name: data?.name, studyList, loginType: data?.loginType, isLoading };
};

export default useMemberRecord;
