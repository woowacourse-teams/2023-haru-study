import AlertErrorBoundary from '@Components/common/AlertErrorBoundary/AlertErrorBoundary';
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
      <AlertErrorBoundary>
        <CreateStudyForm studyMode={studyMode} />
      </AlertErrorBoundary>
    </StudyParticipationLayout>
  );
};

export default CreateStudy;
