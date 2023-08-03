import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { css, styled } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';
import MemberRegister from '@Components/preparation/MemberRegister/MemberRegister';
import MemberRestart from '@Components/preparation/MemberRestart/MemberRestart';
import ParticipationCodeCopier from '@Components/preparation/ParticipationCodeCopier/ParticipationCodeCopier';

import color from '@Styles/color';

import { getCookie } from '@Utils/cookie';

import { requestCheckIsMember } from '@Apis/index';

import StudyPreparationLayout from './layout/StudyPreparationLayout';

type LocationState = {
  state: { participantCode: string; studyName: string; isHost: boolean };
};

const StudyPreparation = () => {
  const { studyId } = useParams();

  const [nickname, setNickname] = useState<string | null>(null);

  const isExistMember = Boolean(nickname);

  const memberId = getCookie('memberId');

  const restart = () => setNickname('');

  const {
    state: { participantCode, studyName, isHost },
  } = useLocation() as LocationState;

  const authenticateMember = useCallback(async () => {
    if (!studyId || !memberId) throw Error('잘못된 접근입니다.');

    const { nickname } = await requestCheckIsMember(studyId, memberId);

    // 서버에서 받은 nickname이 null인 경우 클라이언트 nickname 상태를 ""로 변경
    if (!nickname) setNickname('');
    // 서버에서 받은 nickname이 null인 경우 클라이언트 nickname 상태를 서버에서 받은 nickname으로 변경
    else setNickname(nickname);
  }, [memberId, studyId]);

  useEffect(() => {
    if (isHost || !memberId) {
      // 방장이 스터디를 개설한 뒤 또는 저장된 memberId가 없는 경우
      // 닉네임이 없으니 nickname 상태를 ""로 변경
      // 후 리턴
      console.log(memberId);
      setNickname('');
      return;
    }
    try {
      authenticateMember();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      alert(error.message);
    }
  }, [authenticateMember, isHost, memberId]);

  if (!studyId) return <div>잘못된 접근입니다.</div>;

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
