import { useRef } from 'react';
import { styled } from 'styled-components';

import color from '@Styles/color';

import type { MonthStorage } from '@Types/record';

import MemberRecordCalendarDay from '../MemberRecordCalendarDay/MemberRecordCalendarDay';
import useMemberCalendarRecord from '../hooks/useMemberCalendarRecord';

type Props = {
  monthStorage: MonthStorage;
  memberId: string;
};

const MemberRecordCalendarDays = ({ monthStorage, memberId }: Props) => {
  const calendarRef = useRef<HTMLUListElement>(null);

  const { calendarRecord, calendarData } = useMemberCalendarRecord({ monthStorage, calendarRef, memberId });

  return (
    <Days $numberOfWeeks={calendarRecord.length / 7} ref={calendarRef}>
      {calendarRecord.map((record, index) => (
        <MemberRecordCalendarDay key={index} record={record} calendarData={calendarData} />
      ))}
    </Days>
  );
};

export default MemberRecordCalendarDays;

type DaysProps = {
  $numberOfWeeks: number;
};

const Days = styled.ul<DaysProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${({ $numberOfWeeks }) => `repeat(${$numberOfWeeks}, minmax(135px, auto))`};
  gap: 1px;
  border: 1px solid ${color.neutral[200]};

  background-color: ${color.neutral[200]};

  @media screen and (max-width: 510px) {
    font-size: 1.4rem;
    grid-template-rows: ${({ $numberOfWeeks }) => `repeat(${$numberOfWeeks}, minmax(80px, auto))`};
  }
`;
