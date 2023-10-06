import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ROUTES_PATH } from '@Constants/routes';

import type { StudyInfo } from '@Types/study';

import MemberRecordPeriodListSkeleton from './MemberRecordPeriodListSkeleton';
import MemberRecordItem from '../../MemberRecordItem/MemberRecordItem';
import EmptyMemberRecord from '../EmptyMemberRecord/EmptyMemberRecord';

type Props = {
  memberRecords: StudyInfo[] | null;
  isLoading: boolean;
};

const MemberRecordPeriodList = ({ memberRecords, isLoading }: Props) => {
  const navigate = useNavigate();

  const handleClickStudyItem = (studyId: string) => navigate(`${ROUTES_PATH.record}/${studyId}`);

  if (isLoading) return <MemberRecordPeriodListSkeleton />;

  if (memberRecords && memberRecords.length === 0) return <EmptyMemberRecord />;

  return (
    <Layout>
      {memberRecords?.map((record) => (
        <MemberRecordItem key={record.studyId} record={record} handleClickStudyItem={handleClickStudyItem} />
      ))}
    </Layout>
  );
};

export default MemberRecordPeriodList;

const Layout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
