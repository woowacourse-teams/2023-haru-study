import { Suspense } from 'react';

import MemberRecordCalendar from '../MemberRecordCalendar/MemberRecordCalendar';
import MemberRecordList from '../MemberRecordList/MemberRecordList';
import MemberRecordListSkeleton from '../MemberRecordList/MemberRecordListSkeleton';

type Props = {
  memberId: string;
  viewMode: 'list' | 'calendar';
};

const MemberRecords = ({ memberId, viewMode }: Props) => {
  if (viewMode === 'calendar') return <MemberRecordCalendar />;

  return (
    <Suspense fallback={<MemberRecordListSkeleton />}>
      <MemberRecordList memberId={memberId} />
    </Suspense>
  );
};

export default MemberRecords;
