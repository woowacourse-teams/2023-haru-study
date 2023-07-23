import { useLocation } from 'react-router-dom';

import HostParticipationInfo from '@Components/participation/HostParticipationInfo';
import StudyInfoFormLayout from '@Components/templates/StudyInfoFormLayout';

import { StudyParticipantPageType } from '@Types/location';

const StudyParticipantForHost = () => {
  const {
    state: { studyName },
  } = useLocation() as StudyParticipantPageType;

  return (
    <StudyInfoFormLayout headerText={`${studyName} 스터디`}>
      <HostParticipationInfo />
    </StudyInfoFormLayout>
  );
};

export default StudyParticipantForHost;
