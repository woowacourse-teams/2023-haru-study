import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import useFetch from '@Hooks/useFetch';

import MemberRecordList from './MemberRecordList';
import StudyInformation from './StudyInformation';

type StudyMetadata = {
  members: { memberId: number; nickname: string }[];
  studyName: string;
  timePerCycle: number;
  totalCycle: number;
};

const RecordContents = () => {
  const { studyId } = useParams<{ studyId: string }>();

  const { data } = useFetch<StudyMetadata>(`/api/studies/${studyId!}/metadata`);

  return (
    <RecordContentsLayout>
      <StudyInformation studyName={data?.studyName} totalCycle={data?.totalCycle} timePerCycle={data?.timePerCycle} />
      <MemberRecordList studyId={studyId} members={data?.members} />
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
