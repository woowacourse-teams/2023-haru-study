import type { MonthStorage } from '@Types/record';

import MemberRecordCalendarDay from '../MemberRecordCalendarDay/MemberRecordCalendarDay';
import MemberRecordCalendarDaySkeleton from '../MemberRecordCalendarDay/MemberRecordCalendarDaySkeleton';
import useMemberCalendarRecord from '../hooks/useMemberCalendarRecord';

type Props = {
  monthStorage: MonthStorage;
  memberId: string;
  calendarRef: React.RefObject<HTMLUListElement>;
};

const MemberRecordCalendarDays = ({ monthStorage, memberId, calendarRef }: Props) => {
  const { calendarRecord, calendarData, isLoading } = useMemberCalendarRecord({ monthStorage, calendarRef, memberId });

  if (isLoading) {
    return <MemberRecordCalendarDaySkeleton monthStorage={monthStorage} />;
  }

  return calendarRecord.map((record, index) => (
    <MemberRecordCalendarDay key={index} record={record} calendarData={calendarData} />
  ));
};

export default MemberRecordCalendarDays;
