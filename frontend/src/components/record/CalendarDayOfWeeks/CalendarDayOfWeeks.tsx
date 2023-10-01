import { css, styled } from 'styled-components';

import color from '@Styles/color';

const DAY_COLOR = {
  0: color.red[600],
  1: color.black,
  2: color.black,
  3: color.black,
  4: color.black,
  5: color.black,
  6: color.blue[600],
} as const;

type DAY = keyof typeof DAY_COLOR;

const CalendarDayOfWeeks = () => {
  return (
    <Layout>
      {['일', '월', '화', '수', '목', '금', '토'].map((dayOfWeek, index) => (
        <DayOfWeek key={dayOfWeek} day={index as DAY}>
          {dayOfWeek}
        </DayOfWeek>
      ))}
    </Layout>
  );
};

export default CalendarDayOfWeeks;

const Layout = styled.ul`
  display: flex;
`;

type DayOfWeekProps = {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

const DayOfWeek = styled.li<DayOfWeekProps>`
  flex: 1;
  margin-left: 5px;

  color: ${color.black};

  ${({ day }) => css`
    color: ${DAY_COLOR[day]};
  `}
`;
