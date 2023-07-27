import ParticipationCodeInput from '@Components/preparation/ParticipationCodeInput/ParticipationCodeInput';
import StudyInfoFormLayout from '@Components/templates/StudyInfoFormLayout';

const StudyParticipant = () => {
  return (
    <StudyInfoFormLayout headerText={`스터디 참여하기`}>
      <ParticipationCodeInput />
    </StudyInfoFormLayout>
  );
};

export default StudyParticipant;
