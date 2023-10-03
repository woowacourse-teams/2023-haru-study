import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ROUTES_PATH } from '@Constants/routes';

import type { StudyBasicInfo } from '@Types/study';

import EmptyMemberRecord from '../EmptyMemberRecord/EmptyMemberRecord';
import MemberRecordItem from '../MemberRecordItem/MemberRecordItem';
import MemberRecordListSkeleton from '../MemberRecordList/MemberRecordListSkeleton';

type Props = {
  memberRecords: StudyBasicInfo[] | null;
  isLoading: boolean;
};

const MemberRecordItems = ({ memberRecords, isLoading }: Props) => {
  const navigate = useNavigate();

  const handleClickStudyItem = (studyId: string) => navigate(`${ROUTES_PATH.record}/${studyId}`);

  if (isLoading) return <MemberRecordListSkeleton />;

  if (memberRecords && memberRecords.length === 0) return <EmptyMemberRecord />;

  return (
    <Layout>
      {memberRecords?.map((record) => {
        return <MemberRecordItem key={record.studyId} record={record} handleClickStudyItem={handleClickStudyItem} />;
      })}
    </Layout>
  );
};

export default MemberRecordItems;

const Layout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
