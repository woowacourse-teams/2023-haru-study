import ParticipationCodeInput from '@Components/preparation/ParticipationCodeInput/ParticipationCodeInput';

import StudyPrepationLayout from './layout/StudyPreparationLayout';

const StudyParticipation = () => {
  return (
    <StudyPrepationLayout headerText={`스터디 참여하기`}>
      <ParticipationCodeInput />
    </StudyPrepationLayout>
  );
};

export default StudyParticipation;
