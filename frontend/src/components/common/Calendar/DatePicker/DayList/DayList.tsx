import { css, styled } from 'styled-components';

import { useDatePicker } from '../DatePickerContext/DatePickerProvider';

const DayList = () => {
  const { calendarStorage, getDayBackgroundColor, updateHoverDays, updateStartEndDate } = useDatePicker();

  return (
    <Layout>
      {calendarStorage.map(({ day, state, date }, index) => (
        <Day
          key={index}
          $isCurrentMonthDay={state === 'cur'}
          onClick={() => updateStartEndDate(date)}
          onMouseEnter={() => updateHoverDays(date)}
          $backgroundColor={getDayBackgroundColor(date)}
        >
          {day}
        </Day>
      ))}
    </Layout>
  );
};

export default DayList;

const Layout = styled.ul`
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
