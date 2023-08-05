import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import useStudyRecord from '@Hooks/record/useStudyRecord';

import MemberRecordList from '../MemberRecordList/MemberRecordList';
import StudyInformation from '../StudyInformation/StudyInformation';

const RecordContents = () => {
  const { studyId } = useParams<{ studyId: string }>();

  if (!studyId) throw Error('잘못된 접근입니다.');

  const { isLoading, studyBasicInfo, members } = useStudyRecord(studyId, {
    errorHandler: (message) => alert(message),
  });

  return (
    <RecordContentsLayout>
      <StudyInformation
        studyName={studyBasicInfo?.studyName}
        totalCycle={studyBasicInfo?.totalCycle}
        timePerCycle={studyBasicInfo?.timePerCycle}
        $isLoading={isLoading}
      />
      <MemberRecordList studyId={studyId} members={members} isLoading={isLoading} />
    </RecordContentsLayout>
  );
};

const RecordContentsLayout = styled.div`
  display: grid;
  row-gap: 40px;

  max-width: 1200px;

  margin: 0 auto;
  padding: 0px 60px;
  padding-bottom: 60px;
`;

export default RecordContents;
