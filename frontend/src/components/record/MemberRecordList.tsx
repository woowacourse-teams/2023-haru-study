import Accordion from '@Components/common/Accordion/Accordion';
import Typography from '@Components/common/Typography/Typography';

import MemberRecord from './MemberRecord';

type Props = {
  members?: { memberId: number; nickname: string }[];
  studyId?: string;
};

const MemberRecordList = ({ members = [], studyId = '' }: Props) => {
  return (
    <Accordion>
      {members.map(({ memberId, nickname }) => (
        <Accordion.Item key={memberId}>
          <Accordion.Header>
            <Typography variant="h5">{nickname}의 기록</Typography>
          </Accordion.Header>
          <Accordion.Panel>
            <MemberRecord studyId={studyId} memberId={memberId} nickname={nickname} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default MemberRecordList;
