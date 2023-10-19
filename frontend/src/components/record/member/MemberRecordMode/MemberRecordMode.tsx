import MemberRecordPeriodProvider from '../../contexts/MemberRecordPeriodProvider';
import MemberRecordCalendar from '../calendar/MemberRecordCalendar/MemberRecordCalendar';
import MemberRecordPeriod from '../period/MemberRecordPeriod/MemberRecordPeriod';

type Props = {
  memberId: string;
  viewMode: 'list' | 'calendar';
};

const MemberRecordMode = ({ memberId, viewMode }: Props) => {
  if (viewMode === 'calendar') return <MemberRecordCalendar memberId={memberId} />;

  return (
    <MemberRecordPeriodProvider>
      <MemberRecordPeriod memberId={memberId} />
    </MemberRecordPeriodProvider>
  );
};

export default MemberRecordMode;
