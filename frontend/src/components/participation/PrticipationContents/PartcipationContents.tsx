import { useState } from 'react';
import { styled } from 'styled-components';

import AlertErrorBoundary from '@Components/common/AlertErrorBoundary/AlertErrorBoundary';
import useCheckProgresses from '@Components/participation/hooks/useCheckProgresses';

import MemberRegister from './MemberRegister/MemberRegister';
import MemberRestart from './MemberRestart/MemberRestart';

type Props = {
  studyName: string;
};

const ParticipationContents = ({ studyName }: Props) => {
  const { result, studyId } = useCheckProgresses();

  const [isRegisterShow, setRegisterShow] = useState(false);

  const handleShowMemberRegister = () => {
    setRegisterShow(true);
  };

  return (
    <Layout>
      {result && (
        <AlertErrorBoundary>
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
        </AlertErrorBoundary>
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
