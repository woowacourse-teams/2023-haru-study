import NotificationBoundary from '@Components/common/NotificationBoundary/NotificationBoundary';
import CreateStudyForm from '@Components/create/CreateStudyForm/CreateStudyForm';

import StudyParticipationLayout from './layout/StudyParticipationLayout';

const CreateStudy = () => {
  return (
    <StudyParticipationLayout headerText="스터디 개설하기">
      <NotificationBoundary>
        <CreateStudyForm />
      </NotificationBoundary>
    </StudyParticipationLayout>
  );
};

export default CreateStudy;
