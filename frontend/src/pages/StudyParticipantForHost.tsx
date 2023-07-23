import { useLocation } from 'react-router-dom';

import HostParticipationInfo from '@Components/participation/HostParticipationInfo';
import StudyInfoFormLayout from '@Components/templates/StudyInfoFormLayout';

type LocationState = {
  state: { participantCode: string; studyName: string };
};

const StudyParticipantForHost = () => {
  const {
    state: { participantCode, studyName },
  } = useLocation() as LocationState;

  return (
    <StudyInfoFormLayout headerText={`${studyName} 스터디`}>
      <HostParticipationInfo participantCode={participantCode} studyName={studyName} />
    </StudyInfoFormLayout>
  );
};

export default StudyParticipantForHost;
