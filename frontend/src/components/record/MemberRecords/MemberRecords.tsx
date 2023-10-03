import MemberRecordCalendar from '../MemberRecordCalendar/MemberRecordCalendar';
import MemberRecordList from '../MemberRecordList/MemberRecordList';
import MemberRecordPeriodProvider from '../contexts/MemberRecordPeriodProvider';

type Props = {
  memberId: string;
  viewMode: 'list' | 'calendar';
};

const MemberRecords = ({ memberId, viewMode }: Props) => {
  if (viewMode === 'calendar') return <MemberRecordCalendar />;

  return (
    <MemberRecordPeriodProvider>
      <MemberRecordList memberId={memberId} />
    </MemberRecordPeriodProvider>
  );
};

export default MemberRecords;
