import Accordion from '@Components/common/Accordion/Accordion';
import AccordionSkeleton from '@Components/common/Accordion/AccordionSkeleton';
import Typography from '@Components/common/Typography/Typography';

import MemberRecord from './MemberRecord';

type Props = {
  members?: { memberId: number; nickname: string }[];
  studyId?: string;
  isLoading: boolean;
};

const MemberRecordList = ({ members = [], studyId = '', isLoading }: Props) => {
  if (isLoading) {
    return <AccordionSkeleton />;
  }

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
