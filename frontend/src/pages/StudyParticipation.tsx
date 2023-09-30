import NotificationBoundary from '@Components/common/NotificationBoundary/NotificationBoundary';
import ParticipationCodeInput from '@Components/participation/ParticipationCodeInput/ParticipationCodeInput';

import StudyParticipationLayout from './layout/StudyParticipationLayout';

const StudyParticipation = () => {
  return (
    <StudyParticipationLayout headerText={`스터디 참여하기`}>
      <NotificationBoundary>
        <ParticipationCodeInput />
      </NotificationBoundary>
    </StudyParticipationLayout>
  );
};

export default StudyParticipation;
