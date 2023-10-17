import React from 'react';
import { styled, css } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import color from '@Styles/color';

import type { MonthStorage } from '@Types/record';

import useMemberCalendarRecord from '../../../hooks/useMemberCalendarRecord';
import MemberRecordCalendarDayItem from '../MemberRecordCalendarDayItem/MemberRecordCalendarDayItem';

type Props = {
  monthStorage: MonthStorage;
  memberId: string;
  calendarRef: React.RefObject<HTMLUListElement>;
};

const MemberRecordCalendarDayList = ({ monthStorage, memberId, calendarRef }: Props) => {
  const { calendarRecord, calendarData, isLoading } = useMemberCalendarRecord({ monthStorage, calendarRef, memberId });

  return (
    <>
      {isLoading && (
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
        <MemberRecordCalendarDayItem key={index} record={record} calendarData={calendarData} />
      ))}
    </>
  );
};

export default MemberRecordCalendarDayList;

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
