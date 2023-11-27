import React from 'react';
import { css, styled } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import color from '@Styles/color';

import { useCalendar } from '../CalendarContext/CalendarProvider';
import DayItem from '../DayItem/DayItem';

type Props = {
  calendarRef: React.RefObject<HTMLUListElement>;
};

const DayList = ({ calendarRef }: Props) => {
  const { calendarStorage, dataLoading } = useCalendar();

  return (
    <Layout $numberOfWeeks={calendarStorage.length / 7} ref={calendarRef}>
      {dataLoading && (
        <LoadingBar>
          <CircularProgress
            size="x-large"
            $style={css`
              border: 2px solid ${color.blue[500]};
              border-color: ${color.blue[500]} transparent transparent transparent;
            `}
          />
        </LoadingBar>
      )}
      {calendarStorage.map((data, index) => (
        <DayItem key={index} data={data} />
      ))}
    </Layout>
  );
};

export default DayList;

type DaysProps = {
  $numberOfWeeks: number;
};

const Layout = styled.ul<DaysProps>`
  position: relative;

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
