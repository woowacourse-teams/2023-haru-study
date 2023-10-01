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

const CalendarDayOfWeeks = ({ position = 'left' }: { position?: 'left' | 'center' }) => {
  return (
    <Layout>
      {['일', '월', '화', '수', '목', '금', '토'].map((dayOfWeek, index) => (
        <DayOfWeek key={dayOfWeek} day={index as DAY} position={position}>
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
  position: 'left' | 'center';
};

const DayOfWeek = styled.li<DayOfWeekProps>`
  flex: 1;

  color: ${color.black};

  ${({ day, position }) => css`
    color: ${position === 'left' ? DAY_COLOR[day] : color.black};
    margin-left: ${position === 'left' && '5px'};
    text-align: ${position === 'center' && 'center'};
  `}
`;
