import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

type Props = {
  hasClick?: boolean;
  isToday: boolean;
  isCurrentMonthDay: boolean;
  dayOfWeek: number;
} & ComponentPropsWithoutRef<'div'>;

const Day = ({
  children,
  hasClick = false,
  isToday,
  isCurrentMonthDay,
  dayOfWeek,
  ...rest
}: PropsWithChildren<Props>) => {
  const getDayFontColor = (dayOfWeek: number) => {
    if (dayOfWeek === 0) return color.red[600];

    if (dayOfWeek === 6) return color.blue[600];

    return color.black;
  };

  return (
    <DayContainer
      $hasClick={hasClick}
      $isToday={isToday}
      $isCurrentMonthDay={isCurrentMonthDay}
      $fontColor={getDayFontColor(dayOfWeek)}
      {...rest}
    >
      {children}
    </DayContainer>
  );
};

export default Day;

type DayProps = {
  $isToday: boolean;
  $hasClick: boolean;
  $isCurrentMonthDay: boolean;
  $fontColor: string;
};

const DayContainer = styled.div<DayProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  width: 30px;
  height: 30px;

  ${({ $isToday, $hasClick, $isCurrentMonthDay, $fontColor }) => css`
    background-color: ${$isToday && color.neutral[100]};
    opacity: ${$isCurrentMonthDay ? 1 : 0.4};
    color: ${$fontColor};
    cursor: ${$hasClick && 'pointer'};
  `}

  @media screen and (max-width: 360px) {
    margin: 0 auto;
    margin-top: 5px;
  }
`;
