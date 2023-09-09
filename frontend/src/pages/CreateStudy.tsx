import ErrorBoundary from '@Components/common/ErrorBoundary/ErrorBoundary';
import CreateStudyForm from '@Components/create/CreateStudyForm/CreateStudyForm';

import StudyParticipationLayout from './layout/StudyParticipationLayout';

const CreateStudy = () => {
  return (
    <ErrorBoundary>
      <StudyParticipationLayout headerText="스터디 개설하기">
        <CreateStudyForm />
      </StudyParticipationLayout>
    </ErrorBoundary>
  );
};

export default CreateStudy;
