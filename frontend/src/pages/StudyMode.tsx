import StudyModeContent from '@Components/mode/StudyModeContent/StudyModeContent';

import StudyParticipationLayout from './layout/StudyParticipationLayout';

const StudyMode = () => {
  return (
    <StudyParticipationLayout headerText={`학습 방식 선택하기`}>
      <StudyModeContent />
    </StudyParticipationLayout>
  );
};

export default StudyMode;
