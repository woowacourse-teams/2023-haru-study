import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import AccordionSkeleton from '@Components/common/Accordion/AccordionSkeleton';

import ProgressRecordList from '../ProgressRecordList/ProgressRecordList';
import ResetButton from '../ResetButton/ResetButton';
import StudyInformation from '../StudyInformation/StudyInformation';

const StudyRecordContents = () => {
  const { studyId } = useParams<{ studyId: string }>();

  if (!studyId) throw Error('잘못된 접근입니다.');

  const [isRefetch, setIsRefetch] = useState(false);

  const refetchProgressRecordList = () => {
    setIsRefetch(true);
    setTimeout(() => {
      setIsRefetch(false);
    }, 1000);
  };

  return (
    <Layout>
      <StudyInformation studyId={studyId} />
      <ResetButton refetchProgressRecordList={refetchProgressRecordList} isRefetch={isRefetch} />
      <Suspense fallback={<AccordionSkeleton />}>
        <ProgressRecordList studyId={studyId} isRefetch={isRefetch} />
      </Suspense>
    </Layout>
  );
};

export default StudyRecordContents;

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
