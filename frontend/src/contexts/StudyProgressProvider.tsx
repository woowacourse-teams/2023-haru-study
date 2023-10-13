import { type PropsWithChildren, createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';

import LoadingFallback from '@Components/common/LodingFallback/LoadingFallback';

import useFetch from '@Hooks/api/useFetch';
import useMutation from '@Hooks/api/useMutation';

import type { HttpResponse } from '@Utils/Http';

import { requestGetParticipant, requestGetStudyInfo, requestPostNextStep } from '@Apis/index';

import type { Participant, StudyInfo } from '@Types/study';

import { useMemberInfo } from './MemberInfoProvider';

type StudyProgressAction = {
  updateStudyInfo: () => void;
  moveToNextStep: () => Promise<HttpResponse<object>>;

  updateStudyInfoLoading: boolean;
  moveToNextStepLoading: boolean;
};

const StudyInfoContext = createContext<StudyInfo | null>(null);
const ParticipantInfoContext = createContext<Participant | null>(null);
const StudyProgressActionContext = createContext<StudyProgressAction | null>(null);

const StudyProgressProvider = ({ children }: PropsWithChildren) => {
  const { studyId } = useParams();

  if (!studyId) throw new Error('정상적인 경로로 접근해주세요.');

  const memberInfo = useMemberInfo();

  const {
    result: studyInfo,
    refetch: updateStudyInfo,
    isLoading: updateStudyInfoLoading,
  } = useFetch(() => requestGetStudyInfo(studyId), {
    suspense: false,
  });
  const { result: participantInfo } = useFetch(() => requestGetParticipant(studyId, memberInfo!.memberId), {
    suspense: false,
  });
  const { mutate: moveToNextStep, isLoading: moveToNextStepLoading } = useMutation(() => requestPostNextStep(studyId), {
    onSuccess: updateStudyInfo,
  });

  const actions = {
    updateStudyInfo,
    moveToNextStep,
    updateStudyInfoLoading,
    moveToNextStepLoading,
  };

  if (!studyInfo || !participantInfo) return <LoadingFallback height="100vh" />;

  return (
    <StudyProgressActionContext.Provider value={actions}>
      <StudyInfoContext.Provider value={studyInfo}>
        <ParticipantInfoContext.Provider value={participantInfo}>{children}</ParticipantInfoContext.Provider>
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

export const useParticipantInfo = () => {
  const progressInfo = useContext(ParticipantInfoContext);

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
