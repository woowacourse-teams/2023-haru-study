import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { requestGetMemberProgress, requestGetOneStudyData, requestNextStep } from '@Apis/index';

import type { ProgressInfo, StudyInfo } from '@Types/study';

const useStudyBoard = () => {
  const [studyInfo, setStudyInfo] = useState<StudyInfo | null>(null);
  const [progressInfo, setProgressInfo] = useState<ProgressInfo | null>(null);
  const [error, setError] = useState<Error>();

  const { studyId } = useParams();
  const { data: memberInfo } = useMemberInfo();

  const fetchStudyMetaData = useCallback(async () => {
    try {
      if (!studyId) throw new Error('정상적인 경로로 접근해주세요.');

      if (!memberInfo) return;

      const { data: fetchedStudyInfo } = await requestGetOneStudyData(studyId);
      const { data: fetchedProgressInfo } = await requestGetMemberProgress(studyId, memberInfo.memberId);

      setStudyInfo(fetchedStudyInfo);
      setProgressInfo(fetchedProgressInfo.progresses[0]);
    } catch (reason) {
      if (!(reason instanceof Error)) throw reason;
      setError(reason);
    }
  }, [memberInfo, studyId]);

  const changeNextStep = async () => {
    if (studyInfo === null || progressInfo === null) return;

    await requestNextStep(studyInfo.studyId, progressInfo.progressId);

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
  };

  useEffect(() => {
    fetchStudyMetaData();
  }, [fetchStudyMetaData]);

  return { studyInfo, progressInfo, error, changeNextStep };
};

export default useStudyBoard;
