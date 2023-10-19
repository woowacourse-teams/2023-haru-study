import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import ParticipantRecordList from '../ParticipantRecordList/ParticipantRecordList';
import StudyInformation from '../StudyInformation/StudyInformation';

const StudyRecordContents = () => {
  const { studyId } = useParams<{ studyId: string }>();

  if (!studyId) throw Error('잘못된 접근입니다.');

  return (
    <Layout>
      <StudyInformation studyId={studyId} />
      <ParticipantRecordList studyId={studyId} />
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
