import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import ParticipantCodeCopier from '@Components/lobby/ParticipantCodeCopier/ParticipantCodeCopier';

import useConfirmBeforeRouting from '@Hooks/common/useConfirmBerforeRouting';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';
import { useNotification } from '@Contexts/NotificationProvider';

import ParticipantList from '../ParticipantList/ParticipantList';
import useStudyLobby from '../hooks/useStudyLobby';

const StudyLobbyContents = () => {
  const navigate = useNavigate();
  const { send } = useNotification();

  const { studyId } = useParams();
  const memberInfo = useMemberInfo();

  if (!studyId) throw new Error('잘못 된 접근입니다.');

  const { isHost, participantCode, startStudy, isStarting, exitStudy, isExiting } = useStudyLobby(
    studyId,
    memberInfo!.memberId,
  );

  const navigateToHome = () => {
    navigate(ROUTES_PATH.landing);
    console.log(132);
  };

  const handleStartStudy = async () => {
    await startStudy();

    send({ message: '스터디를 시작합니다.' });
    navigate(`${ROUTES_PATH.progress}/${studyId}`, { state: { block: false } });
  };

  useConfirmBeforeRouting('정말로 스터디를 나가시겠습니까?', exitStudy);

  return (
    participantCode && (
      <Layout>
        <ParticipantCodeCopier participantCode={participantCode} />
        <ParticipantList studyId={studyId} />
        <BottomButtonWrapper>
          {isHost ? (
            <>
              <WaitingMessageWrapper>인원이 모두 참여했다면 시작 버튼을 눌러주세요.</WaitingMessageWrapper>
              <Button variant="primary" onClick={handleStartStudy} isLoading={isStarting}>
                스터디 시작하기
              </Button>
              <Button variant="outlined" onClick={navigateToHome} isLoading={isExiting}>
                스터디 나가기
              </Button>
            </>
          ) : (
            <>
              <WaitingMessageWrapper>방장이 스터디를 시작하기 전까지 기다려주세요.</WaitingMessageWrapper>
              <Button variant="danger" onClick={navigateToHome} isLoading={isExiting}>
                스터디 나가기
              </Button>
            </>
          )}
        </BottomButtonWrapper>
      </Layout>
    )
  );
};

export default StudyLobbyContents;

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

const BottomButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const WaitingMessageWrapper = styled.div`
  text-align: center;
  font-size: 2rem;

  @media screen and (max-width: 768px) {
    font-size: 1.8rem;
  }
`;
