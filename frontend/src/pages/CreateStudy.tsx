import AlertErrorBoundary from '@Components/common/ErrorBoundary/AlertErrorBoundary';
import CreateStudyForm from '@Components/create/CreateStudyForm/CreateStudyForm';

import StudyParticipationLayout from './layout/StudyParticipationLayout';

const CreateStudy = () => {
  return (
    <StudyParticipationLayout headerText="스터디 개설하기">
      <AlertErrorBoundary>
        <CreateStudyForm />
      </AlertErrorBoundary>
    </StudyParticipationLayout>
  );
};

export default CreateStudy;
