import { forwardRef, useEffect } from 'react';

import Accordion from '@Components/common/Accordion/Accordion';
import Typography from '@Components/common/Typography/Typography';

import useFetch from '@Hooks/api/useFetch';

import { requestGetStudyMembers } from '@Apis/index';

import ProgressRecord from '../ProgressRecord/ProgressRecord';

type Props = {
  studyId: string;
  isRefetch: boolean;
};

const ProgressRecordList = forwardRef(({ studyId, isRefetch }: Props) => {
  const { result, refetch } = useFetch(() => requestGetStudyMembers(studyId));

  const memberProgresses = result ? result.data.progresses : [];

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
});

export default ProgressRecordList;
