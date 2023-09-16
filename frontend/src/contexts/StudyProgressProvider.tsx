import LoadingLayout from '@Pages/layout/LoadingLayout';
import { type PropsWithChildren, createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

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
  const navigate = useNavigate();
  const { studyId } = useParams();
  const memberInfo = useMemberInfo();

  const [studyInfo, setStudyInfo] = useState<StudyInfo | null>(null);
  const [progressInfo, setProgressInfo] = useState<ProgressInfo | null>(null);
  const [error, setError] = useState<Error | null>(null);

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

  useEffect(() => {
    const fetchStudyMetaData = async () => {
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
    };
    fetchStudyMetaData();
  }, [memberInfo, navigate, studyId]);

  if (error) {
    alert(error.message);
    navigate(ROUTES_PATH.landing);
  }

  if (studyInfo === null || progressInfo === null) {
    return <LoadingLayout />;
  }

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
