import { Accordion } from 'haru-study-layout';
import { useEffect } from 'react';

import Typography from '@Components/common/Typography/Typography';

import useStudyParticipants from '../../hooks/useStudyParticipants';
import ParticipantRecordItem from '../ParticipantRecordItem/ParticipantRecordItem';

type Props = {
  studyId: string;
  isRefetch: boolean;
};

const ParticipantRecordList = ({ studyId, isRefetch }: Props) => {
  const { participants, refetch } = useStudyParticipants(studyId);

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
            <ParticipantRecordItem studyId={studyId} participantId={participantId} nickname={nickname} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ParticipantRecordList;
