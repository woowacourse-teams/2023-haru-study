/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestGetStudyData, requestGetStudyMembers } from '@Apis/index';

import type { MemberProgress, StudyBasicInfo } from '@Types/study';

import { ExpiredAccessTokenError } from '../../errors/CustomError';

const useStudyRecord = (studyId: string, options?: { errorHandler: (error: Error) => void }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [studyBasicInfo, setStudyBasicInfo] = useState<StudyBasicInfo | null>(null);
  const [memberProgresses, setMemberProgresses] = useState<MemberProgress[]>([]);

  const setInitInfo = (
    { studyName, timePerCycle, totalCycle, createdDateTime }: StudyBasicInfo,
    members: MemberProgress[],
  ) => {
    setStudyBasicInfo({
      studyName,
      timePerCycle,
      totalCycle,
      createdDateTime,
    });
    setMemberProgresses(members);
  };

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

  const fetchStudyRecordData = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        const error = new Error('토큰이 없습니다. 다시 로그인 해주세요.');
        options?.errorHandler(error);
        navigate(ROUTES_PATH.login);
        return;
      }

      const basicInfo = await requestGetStudyData(studyId, accessToken);
      const { pomodoroProgresses } = await requestGetStudyMembers(studyId);

      setInitInfo(basicInfo, pomodoroProgresses);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        const accessToken = await getAccessTokenRefresh();

        if (accessToken) {
          const basicInfo = await requestGetStudyData(studyId, accessToken);
          const { pomodoroProgresses } = await requestGetStudyMembers(studyId);

          setInitInfo(basicInfo, pomodoroProgresses);

          return;
        }

        return;
      }

      if (error instanceof Error) return options?.errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }, [studyId]);

  useEffect(() => {
    fetchStudyRecordData();
  }, [fetchStudyRecordData]);

  return { isLoading, studyBasicInfo, memberProgresses };
};

export default useStudyRecord;
