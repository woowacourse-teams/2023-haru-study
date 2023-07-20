import { useLocation } from 'react-router-dom';

import HostParticipationInfo from '@Components/participation/HostParticipationInfo';
import StudyInfoFormLayout from '@Components/templates/StudyInfoFormLayout';

const StudyParticipantForHost = () => {
  const location = useLocation();
  const studyName = (location.state as { participantCode: string; studyName: string }).studyName;

  return (
    <StudyInfoFormLayout headerText={`${studyName} 스터디`}>
      <HostParticipationInfo />
    </StudyInfoFormLayout>
  );
};

export default StudyParticipantForHost;
