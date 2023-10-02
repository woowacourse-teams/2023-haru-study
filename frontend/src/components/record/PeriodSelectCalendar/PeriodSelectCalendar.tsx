import { css, styled } from 'styled-components';

import Menu from '@Components/common/Menu/Menu';

import useCalendar from '@Hooks/common/useCalendar';

import color from '@Styles/color';

import ArrowIcon from '@Assets/icons/ArrowIcon';

import format from '@Utils/format';

import CalendarDayOfWeeks from '../CalendarDayOfWeeks/CalendarDayOfWeeks';
import { useMemberRecordPeriod } from '../contexts/MemberRecordPeriodProvider';

const MENU_ITEM_STYLE = css`
  row-gap: 3px;
  max-height: 320px;
  overflow: auto;

  font-size: 1.6rem;
  font-weight: 300;
`;

const PeriodSelectCalendar = () => {
  const today = new Date();

  const { startDate, endDate, isMiddleSelectedCustomDate, handleCustomPeriod, handleHoverDays } =
    useMemberRecordPeriod();

  const { year, month, monthStorage, handleMonthShift, handleNavigationMonth, handleYearShift } = useCalendar();

  const getDayBackgroundColor = (fullDateDot: string, fullDate: string) => {
    if (startDate === fullDateDot || endDate === fullDateDot) return color.blue[200];

    if (isMiddleSelectedCustomDate(fullDateDot)) return color.blue[100];

    if (fullDate === format.date(today)) return color.neutral[100];

    return 'transparent';
  };
  return (
    <Layout>
      <Month>
        <CurrentYearMont>
          <span>
            <Menu trigger={<div>{year}년</div>} $menuListStyle={MENU_ITEM_STYLE}>
              {Array.from({ length: today.getFullYear() - 2023 + 2 }).map((_, index) => (
                <Menu.Item key={index} onClick={() => handleYearShift(2023 + index)}>
                  {2023 + index}년
                </Menu.Item>
              ))}
            </Menu>
          </span>
          <span>
            <Menu trigger={<div>{month}월</div>} $menuListStyle={MENU_ITEM_STYLE}>
              {Array.from({ length: 12 }).map((_, index) => (
                <Menu.Item key={index} onClick={() => handleNavigationMonth(index + 1)}>
                  {index + 1}월
                </Menu.Item>
              ))}
            </Menu>
          </span>
        </CurrentYearMont>
        <ShiftButton>
          <ArrowIcon direction="left" onClick={() => handleMonthShift('prev')} />
          <TodayButton onClick={() => handleMonthShift('today')}>●</TodayButton>
          <ArrowIcon direction="right" onClick={() => handleMonthShift('next')} />
        </ShiftButton>
      </Month>
      <CalendarDayOfWeeks position="center" />
      <Days>
        {monthStorage.map(({ day, fullDate, state, fullDateDot }) => (
          <Day
            key={fullDate}
            $isCurrentMonthDay={state === 'cur'}
            onClick={() => handleCustomPeriod(fullDateDot)}
            onMouseEnter={() => handleHoverDays(fullDateDot)}
            $backgroundColor={getDayBackgroundColor(fullDateDot, fullDate)}
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

  svg {
    cursor: pointer;
  }
`;

const ShiftButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  opacity: 0.6;
`;

const TodayButton = styled.div`
  cursor: pointer;
`;

const CurrentYearMont = styled.span`
  display: flex;

  font-size: 2rem;
  font-weight: 500;

  cursor: pointer;
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
