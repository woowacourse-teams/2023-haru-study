import AlertErrorBoundary from '@Components/common/ErrorBoundary/AlertErrorBoundary';
import ParticipationCodeInput from '@Components/participation/ParticipationCodeInput/ParticipationCodeInput';

import StudyParticipationLayout from './layout/StudyParticipationLayout';

const StudyParticipation = () => {
  return (
    <StudyParticipationLayout headerText={`스터디 참여하기`}>
      <AlertErrorBoundary>
        <ParticipationCodeInput />
      </AlertErrorBoundary>
    </StudyParticipationLayout>
  );
};

export default StudyParticipation;
