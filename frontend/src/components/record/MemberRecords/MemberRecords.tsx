import EmptyMemberRecord from '../EmptyMemberRecord/EmptyMemberRecord';
import MemberRecordList from '../MemberRecordList/MemberRecordList';
import useMemberRecords from '../hooks/useMemberRecords';

type Props = {
  memberId: string;
  viewMode: 'list' | 'calendar';
};

const MemberRecords = ({ memberId, viewMode }: Props) => {
  const { memberRecords, isLoading } = useMemberRecords(memberId);

  if (viewMode === 'calendar') return <div>달력모드</div>;

  if (!isLoading && memberRecords.length === 0) return <EmptyMemberRecord />;

  return <MemberRecordList memberRecords={memberRecords} />;
};

export default MemberRecords;
