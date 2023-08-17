import Accordion from '@Components/common/Accordion/Accordion';
import AccordionSkeleton from '@Components/common/Accordion/AccordionSkeleton';
import Typography from '@Components/common/Typography/Typography';

import type { MemberProgress } from '@Types/study';

import ProgressRecord from '../ProgressRecord/ProgressRecord';

type Props = {
  memberProgresses: MemberProgress[];
  studyId?: string;
  isLoading: boolean;
};

const ProgressRecordList = ({ memberProgresses = [], studyId = '', isLoading }: Props) => {
  if (isLoading) {
    return <AccordionSkeleton />;
  }

  return (
    <Accordion>
      {memberProgresses.map(({ progressId, nickname, step, currentCycle }) => (
        <Accordion.Item key={progressId}>
          <Accordion.Header>
            <Typography variant="h5">{nickname}의 기록</Typography>
          </Accordion.Header>
          <Accordion.Panel>
            <ProgressRecord
              studyId={studyId}
              progressId={progressId}
              nickname={nickname}
              isCompleted={step === 'done'}
              currentCycle={currentCycle}
            />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ProgressRecordList;