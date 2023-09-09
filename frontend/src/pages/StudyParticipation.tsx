import ErrorBoundary from '@Components/common/ErrorBoundary/ErrorBoundary';
import ParticipationCodeInput from '@Components/participation/ParticipationCodeInput/ParticipationCodeInput';

import StudyParticipationLayout from './layout/StudyParticipationLayout';

const StudyParticipation = () => {
  return (
    <ErrorBoundary>
      <StudyParticipationLayout headerText={`스터디 참여하기`}>
        <ParticipationCodeInput />
      </StudyParticipationLayout>
    </ErrorBoundary>
  );
};

export default StudyParticipation;
