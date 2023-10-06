import React from 'react';
import { styled, css } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import color from '@Styles/color';

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

  if (isLoading && calendarData === 'name') {
    return <MemberRecordCalendarDaySkeleton monthStorage={monthStorage} />;
  }

  return (
    <>
      {isLoading && calendarData === 'count' && (
        <LoadingBar>
          <CircularProgress
            size="small"
            $style={css`
              border: 2px solid ${color.blue[500]};
              border-color: ${color.blue[500]} transparent transparent transparent;
            `}
          />
        </LoadingBar>
      )}
      {calendarRecord.map((record, index) => (
        <MemberRecordCalendarDay key={index} record={record} calendarData={calendarData} />
      ))}
    </>
  );
};

export default MemberRecordCalendarDays;

const LoadingBar = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
