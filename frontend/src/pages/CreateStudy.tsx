import CreateStudyForm from '@Components/create/CreateStudyForm/CreateStudyForm';

import StudyPreparationLayout from './layout/StudyPreparationLayout';

const CreateStudy = () => {
  return (
    <StudyPreparationLayout headerText="스터디 개설하기">
      <CreateStudyForm />
    </StudyPreparationLayout>
  );
};

export default CreateStudy;
