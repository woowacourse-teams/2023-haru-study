import { useState } from 'react';
import { styled } from 'styled-components';

import NotificationBoundary from '@Components/common/NotificationBoundary/NotificationBoundary';
import useCheckProgresses from '@Components/participation/hooks/useCheckProgresses';

import MemberRegister from './MemberRegister/MemberRegister';
import MemberRestart from './MemberRestart/MemberRestart';
import ParticipationCodeCopier from './ParticipationCodeCopier/ParticipationCodeCopier';

type Props = {
  participantCode: string;
  studyName: string;
  isHost: boolean;
};

const ParticipationContents = ({ participantCode, studyName, isHost }: Props) => {
  const { result, studyId } = useCheckProgresses();

  const [isRegisterShow, setRegisterShow] = useState(false);

  const handleShowMemberRegister = () => {
    setRegisterShow(true);
  };

  return (
    <Layout>
      {isHost && <ParticipationCodeCopier participantCode={participantCode} />}
      {result && (
        <NotificationBoundary>
          {result.progresses && !isRegisterShow ? (
            <MemberRestart
              studyName={studyName}
              nickname={result.progresses[0].nickname}
              studyId={studyId}
              progressId={result.progresses[0].progressId}
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
