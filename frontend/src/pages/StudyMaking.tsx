import StudyMakingForm from '@Components/studyMaking/StudyMakingForm/StudyMakingForm';
import BeforeStudyTemplate from '@Components/templates/StudyInfoFormLayout';

const StudyMaking = () => {
  return (
    <BeforeStudyTemplate headerText="스터디 개설하기">
      <StudyMakingForm />
    </BeforeStudyTemplate>
  );
};

export default StudyMaking;
