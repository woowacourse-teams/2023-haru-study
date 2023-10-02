import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import useCalendar from '@Hooks/common/useCalendar';

import color from '@Styles/color';

import ArrowIcon from '@Assets/icons/ArrowIcon';

import format from '@Utils/format';

import CalendarDayOfWeeks from '../CalendarDayOfWeeks/CalendarDayOfWeeks';
import { useMemberRecordPeriod } from '../contexts/MemberRecordPeriodProvider';

const PeriodSelectCalendar = () => {
  const today = new Date();

  const { startDate, endDate, isMiddleSelectedCustomDate, handleCustomPeriod, handleHoverDays } =
    useMemberRecordPeriod();

  const { year, month, monthStorage, handleMonthShift } = useCalendar();

  const getDayBackgroundColor = (date: string) => {
    if (startDate === date || endDate === date) return color.blue[200];

    if (isMiddleSelectedCustomDate(date)) return color.blue[100];

    if (date === format.date(today)) return color.neutral[100];

    return 'transparent';
  };
  return (
    <Layout>
      <Month>
        <Typography variant="p2">
          {year}년 {month}월
        </Typography>
        <div>
          <ArrowIcon direction="left" onClick={() => handleMonthShift('prev')} />
          <ArrowIcon direction="right" onClick={() => handleMonthShift('next')} />
        </div>
      </Month>
      <CalendarDayOfWeeks position="center" />
      <Days>
        {monthStorage.map(({ day, fullDate, state, fullDateDot }) => (
          <Day
            key={fullDate}
            $isCurrentMonthDay={state === 'cur'}
            onClick={() => handleCustomPeriod(fullDateDot)}
            onMouseEnter={() => handleHoverDays(fullDateDot)}
            $backgroundColor={getDayBackgroundColor(fullDateDot)}
          >
            {day}
          </Day>
        ))}
      </Days>
    </Layout>
  );
};

export default PeriodSelectCalendar;

const Layout = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  left: 0;

  background-color: ${color.white};

  padding: 15px;
  border: 1px solid ${color.neutral[100]};
  border-radius: 4px;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  z-index: 5;
`;

const Month = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 0px 10px;
  margin-bottom: 15px;

  p {
    font-weight: 500;
  }

  div {
    display: flex;
    gap: 20px;
  }

  svg {
    cursor: pointer;
  }
`;

const Days = styled.ul`
  display: grid;
  row-gap: 5px;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;

  margin-top: 10px;
`;

type DayProps = {
  $isCurrentMonthDay: boolean;
  $backgroundColor: string;
};

const Day = styled.li<DayProps>`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px 10px;
  text-align: center;

  width: 42px;
  height: 42px;

  cursor: pointer;

  transition: background-color 0.1s ease;

  ${({ $isCurrentMonthDay, $backgroundColor }) => css`
    opacity: ${$isCurrentMonthDay ? 1 : 0.4};
    background-color: ${$backgroundColor};
  `}
`;
