import { useEffect } from 'react';

import Accordion from '@Components/common/Accordion/Accordion';
import Typography from '@Components/common/Typography/Typography';

import ProgressRecord from '../ProgressRecord/ProgressRecord';
import useStudyMembers from '../hooks/useStudyMembers';

type Props = {
  studyId: string;
  isRefetch: boolean;
};

const ProgressRecordList = ({ studyId, isRefetch }: Props) => {
  const { participants, refetch } = useStudyMembers(studyId);

  useEffect(() => {
    if (isRefetch) refetch();
  }, [isRefetch, refetch]);

  return (
    <Accordion>
      {participants.map(({ participantId, nickname }) => (
        <Accordion.Item key={participantId}>
          <Accordion.Header>
            <Typography variant="h5">{nickname}의 기록</Typography>
          </Accordion.Header>
          <Accordion.Panel>
            <ProgressRecord studyId={studyId} participantId={participantId} nickname={nickname} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ProgressRecordList;
