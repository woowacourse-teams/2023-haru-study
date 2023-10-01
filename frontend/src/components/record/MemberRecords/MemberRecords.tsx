import EmptyMemberRecord from '../EmptyMemberRecord/EmptyMemberRecord';
import MemberRecordCalendar from '../MemberRecordCalendar/MemberRecordCalendar';
import MemberRecordList from '../MemberRecordList/MemberRecordList';
import useMemberRecords from '../hooks/useMemberRecords';

type Props = {
  memberId: string;
  viewMode: 'list' | 'calendar';
};

const MemberRecords = ({ memberId, viewMode }: Props) => {
  const { memberRecords, isLoading } = useMemberRecords(memberId);

  if (viewMode === 'calendar') return <MemberRecordCalendar />;

  if (!isLoading && memberRecords.length === 0) return <EmptyMemberRecord />;

  return <MemberRecordList memberRecords={memberRecords} />;
};

export default MemberRecords;
