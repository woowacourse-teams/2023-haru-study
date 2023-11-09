import { useState } from 'react';
import { styled, css } from 'styled-components';

import Menu from '@Components/common/Menu/Menu';

import color from '@Styles/color';

import ArrowIcon from '@Assets/icons/ArrowIcon';

import calendar from '@Utils/Calendar/Calendar';
import format from '@Utils/format';

import DayOfWeeks from '../Calendar/DayOfWeeks/DayOfWeeks';

const MENU_STYLE = css`
  & > div {
    padding: 0;
  }
`;

const MENU_ITEM_STYLE = css`
  row-gap: 3px;
  max-height: 320px;
  overflow: auto;

  font-size: 1.6rem;
  font-weight: 300;

  top: 40px;
  left: 5px;
`;

type Props = {
  startDate?: Date | null;
  endDate?: Date | null;
};

const DatePicker = ({ startDate, endDate }: Props) => {
  const [start, setStart] = useState(startDate);
  const [end, setEnd] = useState(endDate);

  const today = new Date();

  const [year, setYear] = useState(start ? start.getFullYear() : today.getFullYear());
  const [month, setMonth] = useState(start ? start.getMonth() + 1 : today.getMonth() + 1);
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

  const calendarStorage = calendar.getCalendarStorage(year, month);

  const handleMonthShift = (type: 'next' | 'prev' | 'today') => {
    if (type === 'today') {
      const today = new Date();

      setYear(today.getFullYear());
      setMonth(today.getMonth() + 1);

      return;
    }

    const changedMonth = month + (type === 'next' ? +1 : -1);

    if (changedMonth === 0) {
      setYear((prev) => prev - 1);
      setMonth(12);
      return;
    }

    if (changedMonth === 13) {
      setYear((prev) => prev + 1);
      setMonth(1);
      return;
    }

    setMonth(changedMonth);
  };

  const handleYearShift = (year: number) => setYear(year);

  const handleNavigationMonth = (month: number) => {
    setMonth(month);
  };

  const getDayBackgroundColor = (date: Date, fullDate: string) => {
    if (start && format.date(start, '-') === fullDate) return color.blue[200];

    if (end && format.date(end, '-') === fullDate) return color.blue[200];

    if (isSoonSelectedDate(date) || isIncludeSelectDate(date)) return color.blue[100];

    if (fullDate === format.date(today)) return color.neutral[100];

    return 'transparent';
  };

  const isSoonSelectedDate = (date: Date) => {
    if (!hoveredDay || !start) return false;

    if (hoveredDay > start) {
      if (start <= date && hoveredDay >= date) return true;

      return false;
    } else {
      if (start >= date && hoveredDay <= date) return true;

      return false;
    }
  };

  const isIncludeSelectDate = (date: Date) => {
    if (!start || !end) return false;

    if (new Date(start) < date && new Date(end) >= date) return true;

    return false;
  };

  const updateHoverDays = (date: Date) => {
    if (!start) return;
    if (start && end) return;

    setHoveredDay(date);
  };

  const updateStartEndDate = (date: Date) => {
    setHoveredDay(date);

    let newStartDate: null | Date = null;
    let newEndDate: null | Date = null;

    if (!start) newStartDate = date;

    if (start && !end && new Date(start) > date) {
      newStartDate = date;
      newEndDate = start;
    }

    if (start && !end && new Date(start) < date) {
      newStartDate = start;
      newEndDate = date;
    }

    if (start && end) newStartDate = date;

    setStart(newStartDate);
    setEnd(newEndDate);
  };

  return (
    <Layout>
      <Month>
        <CurrentYearMonth>
          <span>
            <Menu
              trigger={
                <MenuTrigger>
                  {year}년 <ArrowIcon direction="down" />
                </MenuTrigger>
              }
              $menuListStyle={MENU_ITEM_STYLE}
              $style={MENU_STYLE}
            >
              {Array.from({ length: today.getFullYear() - 2023 + 2 }).map((_, index) => (
                <Menu.Item key={index} onClick={() => handleYearShift(2023 + index)}>
                  {2023 + index}년
                </Menu.Item>
              ))}
            </Menu>
          </span>
          <span>
            <Menu
              trigger={
                <MenuTrigger>
                  {month}월 <ArrowIcon direction="down" />
                </MenuTrigger>
              }
              $menuListStyle={MENU_ITEM_STYLE}
              $style={MENU_STYLE}
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <Menu.Item key={index} onClick={() => handleNavigationMonth(index + 1)}>
                  {index + 1}월
                </Menu.Item>
              ))}
            </Menu>
          </span>
        </CurrentYearMonth>
        <ShiftButton>
          <ArrowIcon direction="left" onClick={() => handleMonthShift('prev')} />
          <TodayButton onClick={() => handleMonthShift('today')}>●</TodayButton>
          <ArrowIcon direction="right" onClick={() => handleMonthShift('next')} />
        </ShiftButton>
      </Month>
      <DayOfWeeks position="center" />
      <Days>
        {calendarStorage.map(({ day, state, date }, index) => (
          <Day
            key={index}
            $isCurrentMonthDay={state === 'cur'}
            onClick={() => updateStartEndDate(date)}
            onMouseEnter={() => updateHoverDays(date)}
            $backgroundColor={getDayBackgroundColor(date, format.date(date, '-'))}
          >
            {day}
          </Day>
        ))}
      </Days>
    </Layout>
  );
};

export default DatePicker;

const Layout = styled.div`
  max-width: 360px;

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

  padding: 0px 5px;
  margin-bottom: 20px;

  svg {
    cursor: pointer;
  }
`;

const MenuTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  border-radius: 8px;
  padding: 2px 5px;

  svg {
    width: 6px;
    height: 6px;

    opacity: 0.6;
  }

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${color.neutral[100]};
  }
`;

const ShiftButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  opacity: 0.6;
`;

const TodayButton = styled.div`
  position: relative;
  top: 2px;

  cursor: pointer;
`;

const CurrentYearMonth = styled.span`
  display: flex;

  font-size: 2rem;
  font-weight: 500;

  cursor: pointer;
`;

const Days = styled.ul`
  display: grid;
  row-gap: 5px;
  grid-template-columns: repeat(7, 1fr);

  margin-top: 10px;
`;

type DayProps = {
  $isCurrentMonthDay: boolean;
  $backgroundColor: string;
};

const Day = styled.li<DayProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px 10px;
  text-align: center;

  height: 50px;

  cursor: pointer;

  transition: background-color 0.1s ease;

  ${({ $isCurrentMonthDay, $backgroundColor }) => css`
    opacity: ${$isCurrentMonthDay ? 1 : 0.4};
    background-color: ${$backgroundColor};
  `}
`;
