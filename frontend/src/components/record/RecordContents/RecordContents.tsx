import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import useStudyRecord from '@Hooks/record/useStudyRecord';

import color from '@Styles/color';

import ResetIcon from '@Assets/icons/ResetIcon';

import MemberRecordList from '../MemberRecordList/MemberRecordList';
import StudyInformation from '../StudyInformation/StudyInformation';

const RecordContents = () => {
  const { studyId } = useParams<{ studyId: string }>();

  if (!studyId) throw Error('잘못된 접근입니다.');

  const { isLoading, studyBasicInfo, memberProgresses, refetchStudyRecordData } = useStudyRecord(studyId, {
    errorHandler: (error) => alert(error.message),
  });

  const handleClickResetButton = () => {
    if (isLoading) return;

    refetchStudyRecordData();
  };

  const createdDateTime = studyBasicInfo ? new Date(studyBasicInfo.createdDateTime) : new Date();

  return (
    <RecordContentsLayout>
      <StudyInformation
        studyName={studyBasicInfo?.studyName}
        totalCycle={studyBasicInfo?.totalCycle}
        timePerCycle={studyBasicInfo?.timePerCycle}
        createdDateTime={createdDateTime}
        $isLoading={isLoading}
      />
      <ResetButton onClick={handleClickResetButton} role="presentation">
        <ResetIcon color={color.neutral[500]} />
      </ResetButton>
      <MemberRecordList studyId={studyId} memberProgresses={memberProgresses} isLoading={isLoading} />
    </RecordContentsLayout>
  );
};

export default RecordContents;

const RecordContentsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 40px;

  max-width: 1200px;

  margin: 0 auto;
  padding: 0px 60px;
  padding-bottom: 60px;

  ul {
    grid-column: 1 / -1;
  }

  svg {
    width: 30px;
    height: 30px;
  }
`;

const ResetButton = styled.div`
  justify-self: flex-end;

  padding: 20px;

  cursor: pointer;

  transition: background-color 0.2s ease;
`;
