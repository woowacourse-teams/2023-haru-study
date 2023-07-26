import { useEffect, useState } from 'react';

import { StudyData } from '@Types/study';

const useStudyBoard = () => {
  const [studyData, setStudyData] = useState<StudyData | null>(null);

  useEffect(() => {
    fetch('/api/studies/1/members/1/metadata')
      .then((res) => res.json())
      .then((data: StudyData) => setStudyData(data));
  }, []);

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

  return { studyData, changeNextStep };
};

export default useStudyBoard;
