import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';
import { TextSkeletonStyle } from '@Styles/common';

import { ROUTES_PATH } from '@Constants/routes';

import { useModal } from '@Contexts/ModalProvider';
import { useNotification } from '@Contexts/NotificationProvider';

import useLobbyInfoPolling from '../hooks/useLobbyInfoPolling';

type Props = {
  studyId: string;
};

const ParticipantList = ({ studyId }: Props) => {
  const navigate = useNavigate();
  const { send } = useNotification();
  const { openAlert } = useModal();

  const { participantList, studyStatus } = useLobbyInfoPolling(studyId);

  useEffect(() => {
    if (studyStatus && studyStatus !== 'waiting') {
      send({ message: '스터디가 시작되었습니다.' });
      navigate(`${ROUTES_PATH.progress}/${studyId}`, { state: { block: false } });
    }

    if (participantList?.length === 0) {
      openAlert('스터디장이 스터디를 종료했습니다. 메인 페이지로 이동합니다.', () => {
        navigate(ROUTES_PATH.landing, { state: { block: false } });
      });
    }
  }, [participantList, studyStatus]);

  return (
    <Layout>
      <Typography
        variant="p1"
        $style={css`
          @media screen and (max-width: 768px) {
            font-size: 2rem;
          }
        `}
      >
        현재 참여한 스터디원
      </Typography>
      <MemberList>
        {participantList === undefined ? (
          <>
            <MemberNameSkeleton />
            <MemberNameSkeleton />
            <MemberNameSkeleton />
          </>
        ) : (
          participantList.map((member) => (
            <MemberName key={member.participantId}>
              {member.nickname}
              {member.isHost ? '(방장)' : ''}
            </MemberName>
          ))
        )}
      </MemberList>
    </Layout>
  );
};

export default ParticipantList;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MemberList = styled.div`
  min-height: 150px;

  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  padding: 30px 40px;

  border-radius: 7px;
  border: 1px solid ${color.neutral[200]};
`;

const MemberName = styled.p`
  width: max-content;

  font-size: 2rem;
`;

const MemberNameSkeleton = styled.div`
  width: 60px;
  height: 30px;

  ${TextSkeletonStyle}
`;
