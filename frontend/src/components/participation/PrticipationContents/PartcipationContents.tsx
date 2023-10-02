import { useState } from 'react';
import { styled } from 'styled-components';

import NotificationBoundary from '@Components/common/NotificationBoundary/NotificationBoundary';
import useCheckParticipants from '@Components/participation/hooks/useCheckParticipants';

import MemberRegister from './MemberRegister/MemberRegister';
import MemberRestart from './MemberRestart/MemberRestart';

type Props = {
  studyName: string;
};

const ParticipationContents = ({ studyName }: Props) => {
  const { result, studyId } = useCheckParticipants();

  const [isRegisterShow, setRegisterShow] = useState(false);

  const handleShowMemberRegister = () => {
    setRegisterShow(true);
  };

  return (
    <Layout>
      {result && (
        <NotificationBoundary>
          {result.participants && !isRegisterShow ? (
            <MemberRestart
              studyName={studyName}
              nickname={result.participants[0].nickname}
              studyId={studyId}
              participantId={result.participants[0].participantId}
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
