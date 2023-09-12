import { css, styled } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';
import AlertErrorBoundary from '@Components/common/ErrorBoundary/AlertErrorBoundary';

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

  return result ? (
    <Layout>
      {isHost && <ParticipationCodeCopier participantCode={participantCode} />}
      {
        <AlertErrorBoundary>
          {result.progresses ? (
            <MemberRestart studyName={studyName} nickname={result.progresses[0].nickname} studyId={studyId} />
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
