import ParticipationCodeInput from '@Components/preparation/ParticipationCodeInput/ParticipationCodeInput';

import StudyPreparationLayout from './layout/StudyPreparationLayout';

const StudyParticipation = () => {
  return (
    <StudyPreparationLayout headerText={`스터디 참여하기`}>
      <ParticipationCodeInput />
    </StudyPreparationLayout>
  );
};

export default StudyParticipation;
