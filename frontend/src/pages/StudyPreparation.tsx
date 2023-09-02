import { useLocation } from 'react-router-dom';
import { css, styled } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';
import MemberRegister from '@Components/participation/MemberRegister/MemberRegister';
import MemberRestart from '@Components/participation/MemberRestart/MemberRestart';
import ParticipationCodeCopier from '@Components/participation/ParticipationCodeCopier/ParticipationCodeCopier';

import useCheckProgresses from '@Hooks/participation/useCheckProgresses';

import color from '@Styles/color';

import StudyParticipationLayout from './layout/StudyParticipationLayout';

type LocationState = {
  state: { participantCode: string; studyName: string; isHost: boolean };
};

const StudyPreparation = () => {
  const {
    state: { participantCode, studyName, isHost },
  } = useLocation() as LocationState;

  const { nickname, restart, studyId } = useCheckProgresses(isHost);

  const isExistMember = Boolean(nickname);

  if (nickname === null)
    return (
      <StudyParticipationLayout headerText={`${studyName} 스터디`}>
        <CircularProgress
          size="x-large"
          $style={css`
            margin-top: 200px;
            border: 2px solid ${color.blue[500]};
            border-color: ${color.blue[500]} transparent transparent transparent;
          `}
        />
      </StudyParticipationLayout>
    );

  return (
    <StudyParticipationLayout headerText={`${studyName} 스터디`}>
      <Layout>
        {isHost && <ParticipationCodeCopier participantCode={participantCode} />}
        {isExistMember ? (
          <MemberRestart studyName={studyName} nickname={nickname} studyId={studyId} restart={restart} />
        ) : (
          <MemberRegister studyId={studyId} studyName={studyName} />
        )}
      </Layout>
    </StudyParticipationLayout>
  );
};

export default StudyPreparation;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
`;
