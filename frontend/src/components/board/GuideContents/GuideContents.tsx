import { StudyData } from '@Types/study';

import PlanResult from '../PlanResult/PlanResult';
import PlanningForm from '../PlanningForm/PlanningForm';
import RetrospectForm from '../RetrospectForm/RetrospectForm';

type Props = {
  studyData: StudyData;
  changeNextStep: () => void;
};

const GuideContents = ({ studyData, changeNextStep }: Props) => {
  const isLastCycle = studyData.currentCycle === studyData.totalCycle;

  switch (studyData.step) {
    case 'planning':
      return (
        <PlanningForm
          minutes={studyData.timePerCycle}
          cycle={studyData.currentCycle}
          onClickSubmitButton={changeNextStep}
        />
      );
    case 'studying':
      return <PlanResult onClickSubmitButton={changeNextStep} />;
    case 'retrospect':
      return <RetrospectForm isLastCycle={isLastCycle} onClickSubmitButton={changeNextStep} />;
  }
};

export default GuideContents;