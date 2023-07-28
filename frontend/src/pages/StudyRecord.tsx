import { styled } from 'styled-components';

import Header from '@Components/common/Header/Header';
import RecordContents from '@Components/record/RecordContents/RecordContents';

import color from '@Styles/color';

const StudyRecord = () => {
  return (
    <StudyRecordLayout>
      <Header />
      <RecordContents />
    </StudyRecordLayout>
  );
};

export default StudyRecord;

const StudyRecordLayout = styled.div`
  background-color: ${color.neutral[50]};

  min-height: 100vh;
`;
