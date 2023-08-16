import { useParams } from 'react-router-dom';

import useStudyRecord from '@Hooks/record/useStudyRecord';

import ProgressRecordList from '../ProgressRecordList/ProgressRecordList';
import StudyInformation from '../StudyInformation/StudyInformation';

const StudyRecordContents = () => {
  const { studyId } = useParams<{ studyId: string }>();

  if (!studyId) throw Error('잘못된 접근입니다.');

  const { isLoading, studyBasicInfo, memberProgresses } = useStudyRecord(studyId, {
    errorHandler: (error) => alert(error.message),
  });

  return (
    <>
      <StudyInformation
        studyName={studyBasicInfo?.name}
        totalCycle={studyBasicInfo?.totalCycle}
        timePerCycle={studyBasicInfo?.timePerCycle}
        createdDateTime={studyBasicInfo?.createdDateTime}
        $isLoading={isLoading}
      />
      <ProgressRecordList studyId={studyId} memberProgresses={memberProgresses} isLoading={isLoading} />
    </>
  );
};

export default StudyRecordContents;
