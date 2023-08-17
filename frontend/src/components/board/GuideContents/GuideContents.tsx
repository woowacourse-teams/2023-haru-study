import type { ProgressInfo, StudyInfo } from '@Types/study';

import PlanningForm from '../PlanningForm/PlanningForm';
import RetrospectForm from '../RetrospectForm/RetrospectForm';
import StudyingForm from '../StudyingForm/StudyingForm';

type Props = {
  studyInfo: StudyInfo;
  progressInfo: ProgressInfo;
  changeNextStep: () => Promise<void>;
};

const GuideContents = ({ studyInfo, progressInfo, changeNextStep }: Props) => {
  const isLastCycle = progressInfo.currentCycle === studyInfo.totalCycle;

  switch (progressInfo.step) {
    case 'planning':
      return (
        <PlanningForm
          onClickSubmitButton={changeNextStep}
          studyId={studyInfo.studyId}
          progressId={progressInfo.progressId}
        />
      );
    case 'studying':
      return (
        <StudyingForm
          onClickSubmitButton={changeNextStep}
          studyId={studyInfo.studyId}
          progressId={progressInfo.progressId}
          cycle={progressInfo.currentCycle}
        />
      );
    case 'retrospect':
      return (
        <RetrospectForm
          isLastCycle={isLastCycle}
          onClickSubmitButton={changeNextStep}
          studyId={studyInfo.studyId}
          progressId={progressInfo.progressId}
        />
      );
  }
};

export default GuideContents;
