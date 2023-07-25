import ParticipationInfo from '@Components/participation/ParticipationInfo/ParticipationInfo';
import StudyInfoFormLayout from '@Components/templates/StudyInfoFormLayout';

const StudyParticipant = () => {
  return (
    <StudyInfoFormLayout headerText={`스터디 참여하기`}>
      <ParticipationInfo />
    </StudyInfoFormLayout>
  );
};

export default StudyParticipant;
