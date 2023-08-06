import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { css, styled } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';
import MemberRegister from '@Components/preparation/MemberRegister/MemberRegister';
import MemberRestart from '@Components/preparation/MemberRestart/MemberRestart';
import ParticipationCodeCopier from '@Components/preparation/ParticipationCodeCopier/ParticipationCodeCopier';

import useCheckIsMember from '@Hooks/preparation/useCheckIsMember';

import color from '@Styles/color';

import StudyPreparationLayout from './layout/StudyPreparationLayout';

type LocationState = {
  state: { participantCode: string; studyName: string; isHost: boolean };
};

const StudyPreparation = () => {
  const {
    state: { participantCode, studyName, isHost },
  } = useLocation() as LocationState;

  const errorHandler = useCallback((error: Error) => {
    alert(error.message);
  }, []);

  const { nickname, restart, studyId } = useCheckIsMember(isHost, errorHandler);

  const isExistMember = Boolean(nickname);

  if (nickname === null)
    return (
      <StudyPreparationLayout headerText={`${studyName} 스터디`}>
        <CircularProgress
          size="x-large"
          $style={css`
            margin-top: 200px;
            border: 2px solid ${color.blue[500]};
            border-color: ${color.blue[500]} transparent transparent transparent;
          `}
        />
      </StudyPreparationLayout>
    );

  if (nickname === null)
    return (
      <StudyPreparationLayout headerText={`${studyName} 스터디`}>
        <CircularProgress
          size="x-large"
          $style={css`
            margin-top: 200px;
            border: 2px solid ${color.blue[500]};
            border-color: ${color.blue[500]} transparent transparent transparent;
          `}
        />
      </StudyPreparationLayout>
    );

  return (
    <StudyPreparationLayout headerText={`${studyName} 스터디`}>
      <Layout>
        {isHost && <ParticipationCodeCopier participantCode={participantCode} />}
        {isExistMember ? (
          <MemberRestart studyName={studyName} nickname={nickname} studyId={studyId} restart={restart} />
        ) : (
          <MemberRegister studyId={studyId} studyName={studyName} />
        )}
      </Layout>
    </StudyPreparationLayout>
  );
};

export default StudyPreparation;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
`;
