import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import LoadingFallback from '@Components/common/LodingFallback/LoadingFallback';
import MemberInfoGuard from '@Components/common/MemberInfoGuard/MemberInfoGuard';
import StudyLobbyContents from '@Components/lobby/StudyLobbyContents/StudyLobbyContents';

import StudyParticipationLayout from './layout/StudyParticipationLayout';

type LocationState = {
  studyName: string;
};

const StudyLobby = () => {
  const locationState = useLocation().state as LocationState | null;

  const headerText = locationState ? `${locationState.studyName} 스터디` : '스터디 대기방';

  return (
    <MemberInfoGuard>
      <StudyParticipationLayout headerText={headerText}>
        <Suspense fallback={<LoadingFallback />}>
          <StudyLobbyContents />
        </Suspense>
      </StudyParticipationLayout>
    </MemberInfoGuard>
  );
};

export default StudyLobby;
