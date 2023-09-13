import { useState } from 'react';
import { css, styled } from 'styled-components';

import AlertErrorBoundary from '@Components/common/AlertErrorBoundary/AlertErrorBoundary';
import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import useCheckProgresses from '@Hooks/participation/useCheckProgresses';

import color from '@Styles/color';

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

  return result ? (
    <Layout>
      {isHost && <ParticipationCodeCopier participantCode={participantCode} />}
      {
        <AlertErrorBoundary>
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
        </AlertErrorBoundary>
      }
    </Layout>
  ) : (
    <CircularProgress
      size="x-large"
      $style={css`
        margin-top: 200px;
        border: 2px solid ${color.blue[500]};
        border-color: ${color.blue[500]} transparent transparent transparent;
      `}
    />
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

export default ParticipationContents;
