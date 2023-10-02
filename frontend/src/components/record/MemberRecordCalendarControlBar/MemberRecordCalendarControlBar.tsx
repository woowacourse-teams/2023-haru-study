import { useState } from 'react';
import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import useOutsideClick from '@Hooks/common/useOutsideClick';

import color from '@Styles/color';

import ArrowIcon from '@Assets/icons/ArrowIcon';

type Props = {
  year: number;
  month: number;
  navigationYear: number;
  handleMonthShift: (type: 'next' | 'prev' | 'today') => void;
  handleNavigationYear: (type: 'next' | 'prev') => void;
  handleNavigationMonth: (month: number) => void;
};

const MemberRecordCalendarControlBar = ({
  year,
  month,
  navigationYear,
  handleMonthShift,
  handleNavigationYear,
  handleNavigationMonth,
}: Props) => {
  const [isOpenCalendarNavigation, setIsOpenCalendarNavigation] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpenCalendarNavigation(false));

  return (
    <Layout ref={ref}>
      <Typography variant="p1" onClick={() => setIsOpenCalendarNavigation((prev) => !prev)}>
        {year}년 {month}월
        <ArrowIcon direction="down" />
      </Typography>
      <MonthShiftButtonContainer>
        <MonthShiftButton onClick={() => handleMonthShift('prev')}>
          <ArrowIcon direction="left" />
        </MonthShiftButton>
        <MonthShiftButton onClick={() => handleMonthShift('next')}>
          <ArrowIcon direction="right" />
        </MonthShiftButton>
        <ShiftTodayButton onClick={() => handleMonthShift('today')}>오늘</ShiftTodayButton>
      </MonthShiftButtonContainer>
      {isOpenCalendarNavigation && (
        <CalendarNavigation>
          <YearNavigation>
            <div>{navigationYear}</div>
            <YearNavigationButton>
              <ArrowIcon direction="left" onClick={() => handleNavigationYear('prev')} />
              <ArrowIcon direction="right" onClick={() => handleNavigationYear('next')} />
            </YearNavigationButton>
          </YearNavigation>
          <MonthNavigation>
            {Array.from({ length: 12 }).map((_, index) => (
              <Month
                $isCurMonth={index + 1 === month && year === navigationYear}
                key={index}
                onClick={() => {
                  handleNavigationMonth(index + 1);
                  setIsOpenCalendarNavigation(false);
                }}
              >
                {index + 1}월
              </Month>
            ))}
          </MonthNavigation>
        </CalendarNavigation>
      )}
    </Layout>
  );
};

export default MemberRecordCalendarControlBar;

const Layout = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: fit-content;

  p {
    width: 170px;

    padding: 0px 3px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    border-radius: 4px;

    transition: background-color 0.2s ease;

    cursor: pointer;

    &:hover {
      background-color: ${color.neutral[100]};
    }
  }
`;

const MonthShiftButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  margin-left: 20px;
`;

const MonthShiftButton = styled.div`
  padding: 8px;
  border-radius: 50%;

  border: 1px solid ${color.neutral[200]};

  cursor: pointer;
`;

const ShiftTodayButton = styled.div`
  padding: 4px 16px;
  border-radius: 16px;

  border: 1px solid ${color.neutral[200]};

  cursor: pointer;
`;

const CalendarNavigation = styled.div`
  position: absolute;
  top: 40px;

  background-color: ${color.white};

  padding: 10px;
  border: 1px solid ${color.neutral[100]};
  border-radius: 4px;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  z-index: 5;
`;

const YearNavigation = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px;

  & > div {
    font-weight: 700;
  }
`;

const YearNavigationButton = styled.div`
  display: flex;
  gap: 20px;

  opacity: 0.6;

  svg {
    cursor: pointer;
  }
`;

const MonthNavigation = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 80px);
  row-gap: 5px;
  justify-items: center;

  padding: 10px;
`;

type MonthProps = {
  $isCurMonth: boolean;
};

const Month = styled.li<MonthProps>`
  padding: 10px 20px;
  border-radius: 4px;

  transition: background-color 0.2s ease;

  cursor: pointer;

  ${({ $isCurMonth }) => css`
    color: ${$isCurMonth ? color.blue[500] : color.neutral[600]};
    font-weight: ${$isCurMonth ? 500 : 300};
  `}

  &:hover {
    background-color: ${color.blue[100]};
  }
`;
