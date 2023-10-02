import MemberRecordCalendar from '../MemberRecordCalendar/MemberRecordCalendar';
import MemberRecordList from '../MemberRecordList/MemberRecordList';

type Props = {
  memberId: string;
  viewMode: 'list' | 'calendar';
};

const MemberRecords = ({ memberId, viewMode }: Props) => {
  if (viewMode === 'calendar') return <MemberRecordCalendar />;

  return <MemberRecordList memberId={memberId} />;
};

export default MemberRecords;
