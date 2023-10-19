import Accordion from '@Components/common/Accordion/Accordion';
import AccordionSkeleton from '@Components/common/Accordion/AccordionSkeleton';
import Typography from '@Components/common/Typography/Typography';

import useStudyParticipants from '../../hooks/useStudyParticipants';
import ParticipantRecordItem from '../ParticipantRecordItem/ParticipantRecordItem';

type Props = {
  studyId: string;
};

const ParticipantRecordList = ({ studyId }: Props) => {
  const { participants, isLoading } = useStudyParticipants(studyId);

  if (isLoading) {
    return <AccordionSkeleton />;
  }

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
