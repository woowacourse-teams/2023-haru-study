import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { StudyData } from '@Types/study';

import { getCookie } from '@Utils/cookie';

const useStudyBoard = () => {
  const [studyData, setStudyData] = useState<StudyData | null>(null);
  const [error, setError] = useState<Error>();

  const { studyId } = useParams();
  const memberId = getCookie('memberId');

  useEffect(() => {
    try {
      if (studyId === undefined || memberId === null) {
        throw new Error('유저 정보를 불러오는 중 문제가 발생했습니다.');
      }

      fetch(`/api/studies/${studyId}/members/${memberId}/metadata`)
        .then((res) => res.json())
        .then((data: StudyData) => setStudyData(data))
        .catch(() => {
          throw new Error('유저 정보를 불러오는 중 문제가 발생했습니다');
        });
    } catch (error) {
      if (!(error instanceof Error)) return;
      setError(error);
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
