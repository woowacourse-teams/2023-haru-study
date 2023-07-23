import StudyMakingForm from '@Components/studyMaking/StudyMakingForm';
import StudyInfoFormLayout from '@Components/templates/StudyInfoFormLayout';

const StudyMaking = () => {
  return (
    <StudyInfoFormLayout headerText="스터디 개설하기">
      <StudyMakingForm />
    </StudyInfoFormLayout>
  );
};

export default StudyMaking;
