import SubmitContents from '@Components/starter/SubmitContents/SubmitContents';
import BeforeStudyTemplate from '@Components/templates/BeforeStudyTemplate';

const MakingStudy = () => {
  return (
    <BeforeStudyTemplate headerText="스터디 개설하기">
      <SubmitContents />
    </BeforeStudyTemplate>
  );
};

export default MakingStudy;
