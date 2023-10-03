import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ROUTES_PATH } from '@Constants/routes';

import EmptyMemberRecord from '../EmptyMemberRecord/EmptyMemberRecord';
import MemberRecordItem from '../MemberRecordItem/MemberRecordItem';
import MemberRecordListSkeleton from '../MemberRecordList/MemberRecordListSkeleton';
import { useMemberRecordPeriod } from '../contexts/MemberRecordPeriodProvider';
import useMemberRecords from '../hooks/useMemberRecords';

type Props = {
  memberId: string;
};

const MemberRecordItems = ({ memberId }: Props) => {
  const { fetchStartDate: startDate, fetchEndDate: endDate } = useMemberRecordPeriod();

  const { memberRecords, isLoading } = useMemberRecords({
    memberId,
    startDate,
    endDate,
  });

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
