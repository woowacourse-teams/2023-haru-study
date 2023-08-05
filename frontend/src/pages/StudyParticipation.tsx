import ParticipationCodeInput from '@Components/participation/ParticipationCodeInput/ParticipationCodeInput';

import StudyPreparationLayout from './layout/StudyPreparationLayout';

const StudyParticipation = () => {
  return (
    <StudyPreparationLayout headerText={`스터디 참여하기`}>
      <ParticipationCodeInput />
    </StudyPreparationLayout>
  );
};

export default StudyParticipation;
