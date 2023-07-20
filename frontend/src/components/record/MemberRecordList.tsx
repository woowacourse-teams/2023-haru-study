import { styled } from 'styled-components';

import Accordion from '@Components/common/Accordion/Accordion';
import Typography from '@Components/common/Typography/Typography';

import MemberRecord from './MemberRecord';
import { TextSkeletonStyle } from './StudyInformation';

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

const AccordionSkeleton = () => {
  return (
    <AccordionSkeletonLayout>
      <SkeletonItem />
      <SkeletonItem />
    </AccordionSkeletonLayout>
  );
};

const AccordionSkeletonLayout = styled.div`
  display: grid;
  row-gap: 40px;

  max-width: 1200px;
`;

const SkeletonItem = styled.div`
  height: 80px;
  ${TextSkeletonStyle}
`;
