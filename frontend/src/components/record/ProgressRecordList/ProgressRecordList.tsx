import { useEffect } from 'react';

import Accordion from '@Components/common/Accordion/Accordion';
import Typography from '@Components/common/Typography/Typography';

import useStudyMembers from '@Hooks/record/useStudyMembers';

import ProgressRecord from '../ProgressRecord/ProgressRecord';

type Props = {
  studyId: string;
  isRefetch: boolean;
};

const ProgressRecordList = ({ studyId, isRefetch }: Props) => {
  const { memberProgresses, refetch } = useStudyMembers(studyId);

  useEffect(() => {
    if (isRefetch) refetch();
  }, [isRefetch, refetch]);

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
