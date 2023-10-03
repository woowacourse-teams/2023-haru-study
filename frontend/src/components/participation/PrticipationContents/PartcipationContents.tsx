import { styled } from 'styled-components';

import NotificationBoundary from '@Components/common/NotificationBoundary/NotificationBoundary';
import useCheckParticipants from '@Components/participation/hooks/useCheckParticipants';

import MemberRegister from './MemberRegister/MemberRegister';
import MemberRestart from './MemberRestart/MemberRestart';

type Props = {
  studyName: string;
};

const ParticipationContents = ({ studyName }: Props) => {
  const { participantsResult, nickname, participantId, studyId, handleShowMemberRegister, isShownMemeberRestart } =
    useCheckParticipants();

  return (
    <Layout>
      {participantsResult && (
        <NotificationBoundary>
          {isShownMemeberRestart ? (
            <MemberRestart
              studyName={studyName}
              nickname={nickname!}
              studyId={studyId}
              participantId={participantId!}
              showMemberRegister={handleShowMemberRegister}
            />
          ) : (
            <MemberRegister studyId={studyId} studyName={studyName} />
          )}
        </NotificationBoundary>
      )}
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

export default ParticipationContents;
