import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';
import { TextSkeletonStyle } from '@Styles/common';

import useLobbyInfoPolling from '../hooks/useLobbyInfoPolling';

type Props = {
  studyId: string;
  onStartStudy: () => void;
};

const ParticipantList = ({ studyId, onStartStudy }: Props) => {
  const { participantList, studyStatus } = useLobbyInfoPolling(studyId);

  if (studyStatus && studyStatus !== 'waiting') {
    onStartStudy();
  }

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
        {participantList.length === 0 ? (
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
