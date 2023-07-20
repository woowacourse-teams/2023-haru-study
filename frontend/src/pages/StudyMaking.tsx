import SubmitContents from '@Components/studyMaking/SubmitContents/SubmitContents';
import BeforeStudyTemplate from '@Components/templates/BeforeStudyTemplate';

const StudyMaking = () => {
  return (
    <BeforeStudyTemplate headerText="스터디 개설하기">
      <SubmitContents />
    </BeforeStudyTemplate>
  );
};

export default StudyMaking;
