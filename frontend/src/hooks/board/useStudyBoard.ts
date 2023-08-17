import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { boolCheckCookie } from '@Utils/cookie';

import {
  requestAccessTokenRefresh,
  requestGetMemberProgress,
  requestGetOneStudyData,
  requestNextStep,
} from '@Apis/index';

import type { ProgressInfo, StudyInfo } from '@Types/study';

import { APIError } from '@Errors/index';

const useStudyBoard = () => {
  const [studyInfo, setStudyInfo] = useState<StudyInfo | null>(null);
  const [progressInfo, setProgressInfo] = useState<ProgressInfo | null>(null);
  const [error, setError] = useState<Error>();

  const { studyId } = useParams();
  const { data: memberInfo } = useMemberInfo();

  const refreshAccessToken = async () => {
    if (!boolCheckCookie('refreshToken')) {
      setError(new Error('리프레시 토큰이 존재하지 않습니다. 다시 로그인 해주세요.'));
      return;
    }

    const { accessToken } = await requestAccessTokenRefresh();
    sessionStorage.setItem('accessToken', accessToken);
  };

  const fetchStudyMetaData = useCallback(async () => {
    if (!studyId) {
      setError(new Error('정상적인 경로로 접근해주세요.'));
      return;
    }

    if (!memberInfo) {
      return;
    }

    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      setError(new Error('엑세스 토큰이 존재하지 않습니다. 다시 로그인 해주세요.'));
      return;
    }

    try {
      const fetchedStudyInfoData = await requestGetOneStudyData(accessToken, studyId);
      const fetchedProgressInfoData = await requestGetMemberProgress(accessToken, studyId, memberInfo.memberId);

      setStudyInfo(fetchedStudyInfoData);
      setProgressInfo(fetchedProgressInfoData.progresses[0]);
    } catch (error) {
      if (error instanceof APIError && error.code === '1403') {
        await refreshAccessToken();
        await fetchStudyMetaData();
        return;
      }

      throw error;
    }
  }, [memberInfo, studyId]);

  useEffect(() => {
    try {
      fetchStudyMetaData();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      setError(new Error('유저 정보를 불러오는 중 문제가 발생했습니다.'));
    }
  }, [fetchStudyMetaData]);

  const changeNextStep = async () => {
    if (studyInfo === null || progressInfo === null) return;

    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      setError(new Error('엑세스 토큰이 존재하지 않습니다. 다시 로그인 해주세요.'));
      return;
    }

    try {
      await requestNextStep(accessToken, studyInfo.studyId, progressInfo.progressId);

      switch (progressInfo.step) {
        case 'planning':
          setProgressInfo({ ...progressInfo, step: 'studying' });
          break;
        case 'studying':
          setProgressInfo({ ...progressInfo, step: 'retrospect' });
          break;
        case 'retrospect':
          setProgressInfo({
            ...progressInfo,
            currentCycle: progressInfo.currentCycle + 1,
            step: 'planning',
          });
          break;
      }
    } catch (error) {
      if (error instanceof APIError && error.code === '1403') {
        await refreshAccessToken();
        await changeNextStep();
        return;
      }

      throw error;
    }
  };

  return { studyInfo, progressInfo, error, changeNextStep };
};

export default useStudyBoard;
