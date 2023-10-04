import NotificationBoundary from '@Components/common/NotificationBoundary/NotificationBoundary';
import CreateStudyForm from '@Components/create/CreateStudyForm/CreateStudyForm';

import url from '@Utils/url';

import type { StudyMode } from '@Types/study';

import NotFound from './NotFound';
import StudyParticipationLayout from './layout/StudyParticipationLayout';

const CreateStudy = () => {
  const studyMode: StudyMode = url.getQueryString('mode');

  if (!(studyMode === 'group' || studyMode === 'alone')) return <NotFound />;

  return (
    <StudyParticipationLayout headerText={studyMode === 'alone' ? '혼자 공부하기' : '스터디 개설하기'}>
      <NotificationBoundary>
        <CreateStudyForm studyMode={studyMode} />
      </NotificationBoundary>
    </StudyParticipationLayout>
  );
};

export default CreateStudy;
