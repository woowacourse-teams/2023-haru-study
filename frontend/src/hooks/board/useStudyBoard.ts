import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCookie } from '@Utils/cookie';

import { requestGetMemberStudyMetadata } from '@Apis/index';

import type { StudyData } from '@Types/study';

const useStudyBoard = () => {
  const [studyData, setStudyData] = useState<StudyData | null>(null);
  const [error, setError] = useState<Error>();

  const { studyId } = useParams();
  const memberId = getCookie('memberId');

  useEffect(() => {
    const fetchStudyMetaData = async () => {
      if (!studyId || !memberId) throw new Error('정상적인 경로로 접근해주세요.');

      const fetchedData = await requestGetMemberStudyMetadata(studyId, memberId);
      setStudyData({ ...fetchedData, studyId, memberId });
    };

    try {
      fetchStudyMetaData();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      setError(new Error('유저 정보를 불러오는 중 문제가 발생했습니다.'));
    }
  }, [memberId, studyId]);

  const changeNextStep = () => {
    if (studyData === null) return;

    switch (studyData.step) {
      case 'planning':
        setStudyData({ ...studyData, step: 'studying' });
        break;
      case 'studying':
        setStudyData({ ...studyData, step: 'retrospect' });
        break;
      case 'retrospect':
        setStudyData({
          ...studyData,
          currentCycle: studyData.currentCycle + 1,
          step: 'planning',
        });
        break;
    }
  };

  return { studyData, error, changeNextStep };
};

export default useStudyBoard;
