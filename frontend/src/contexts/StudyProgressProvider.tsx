import { type PropsWithChildren, createContext, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import useFetch from '@Hooks/api/useFetch';

import { requestGetMemberProgress, requestGetOneStudyData, requestNextStep } from '@Apis/index';

import type { ProgressInfo, StudyInfo } from '@Types/study';

import { useMemberInfo } from './MemberInfoProvider';

type StudyProgressAction = {
  onNextStep: () => Promise<void>;
};

const StudyInfoContext = createContext<StudyInfo | null>(null);
const ProgressInfoContext = createContext<ProgressInfo | null>(null);
const StudyProgressActionContext = createContext<StudyProgressAction | null>(null);

const StudyProgressProvider = ({ children }: PropsWithChildren) => {
  const { studyId } = useParams();
  if (!studyId) throw new Error('정상적인 경로로 접근해주세요.');

  const memberInfo = useMemberInfo();
  const [progressInfo, setProgressInfo] = useState<ProgressInfo | null>(null);

  const { result: studyInfo } = useFetch(() => requestGetOneStudyData(studyId));
  useFetch(() => requestGetMemberProgress(studyId, memberInfo!.memberId), {
    onSuccess: setProgressInfo,
  });

  const actions = {
    onNextStep: async () => {
      if (studyInfo === null || progressInfo === null) return;

      await requestNextStep(studyInfo.studyId, progressInfo.progressId);

      if (progressInfo.step === 'planning') {
        setProgressInfo({ ...progressInfo, step: 'studying' });
        return;
      }
      if (progressInfo.step === 'studying') {
        setProgressInfo({ ...progressInfo, step: 'retrospect' });
        return;
      }
      if (progressInfo.step === 'retrospect') {
        setProgressInfo({
          ...progressInfo,
          currentCycle: progressInfo.currentCycle + 1,
          step: 'planning',
        });
      }
    },
  };

  if (!studyInfo || !progressInfo) return;

  return (
    <StudyProgressActionContext.Provider value={actions}>
      <StudyInfoContext.Provider value={studyInfo}>
        <ProgressInfoContext.Provider value={progressInfo}>{children}</ProgressInfoContext.Provider>
      </StudyInfoContext.Provider>
    </StudyProgressActionContext.Provider>
  );
};

export default StudyProgressProvider;

export const useStudyInfo = () => {
  const studyInfo = useContext(StudyInfoContext);

  if (studyInfo === null) {
    throw new Error('스터디 정보를 불러오는 중 문제가 발생했습니다.');
  }

  return studyInfo;
};

export const useProgressInfo = () => {
  const progressInfo = useContext(ProgressInfoContext);

  if (progressInfo === null) {
    throw new Error('스터디 정보를 불러오는 중 문제가 발생했습니다.');
  }

  return progressInfo;
};

export const useStudyProgressAction = () => {
  const studyProgressAction = useContext(StudyProgressActionContext);

  if (studyProgressAction === null) {
    throw new Error('스터디 정보를 불러오는 중 문제가 발생했습니다.');
  }

  return studyProgressAction;
};
