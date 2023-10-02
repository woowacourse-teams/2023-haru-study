import { useState } from 'react';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import useCalendar from '@Hooks/common/useCalendar';
import useOutsideClick from '@Hooks/common/useOutsideClick';

import color from '@Styles/color';

import { PERIOD } from '@Constants/record';

import ArrowIcon from '@Assets/icons/ArrowIcon';
import CalenderIcon from '@Assets/icons/CalenderIcon';

import format from '@Utils/format';

import CalendarDayOfWeeks from '../CalendarDayOfWeeks/CalendarDayOfWeeks';
import type { Period } from '../contexts/MemberRecordPeriodProvider';
import { useMemberRecordPeriod } from '../contexts/MemberRecordPeriodProvider';

const periodTypes: Period[] = ['week', 'oneMonth', 'threeMonth', 'entire'];

const PeriodSelectionBar = () => {
  const today = new Date();

  const {
    period,
    startDate,
    endDate,
    hasSelectedCustomPeriod,
    isMiddleSelectedCustomDate,
    handlePeriod,
    handleCustomPeriod,
    handleHoverDays,
  } = useMemberRecordPeriod();

  const { year, month, monthStorage, handleMonthShift } = useCalendar();
  const [isOpenSelectPeriodDate, setIsOpenSelectPeriodDate] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsOpenSelectPeriodDate(false);
  });

  const getDayBackgroundColor = (date: string) => {
    if (startDate === date || endDate === date) return color.blue[200];

    if (isMiddleSelectedCustomDate(date)) return color.blue[100];

    if (date === format.date(today)) return color.neutral[100];

    return 'transparent';
  };

  return (
    <Layout>
      <SelectButtonContainer>
        {periodTypes.map((periodType) => (
          <SelectButton $isSelected={period === periodType} onClick={() => handlePeriod(periodType)} key={periodType}>
            {PERIOD[periodType]}
          </SelectButton>
        ))}
      </SelectButtonContainer>
      <UserSelectPeriodContainer>
        <SelectDateWrapper ref={ref}>
          <SelectedDate $hasSelectedCustomPeriod={hasSelectedCustomPeriod}>
            {hasSelectedCustomPeriod ? (
              <>
                <div>{startDate}</div>
                <div>~</div>
                <div>{endDate}</div>
              </>
            ) : (
              '날짜를 선택해주세요.'
            )}
          </SelectedDate>
          <SelectDateButton onClick={() => setIsOpenSelectPeriodDate(true)}>
            <CalenderIcon color={color.black} />
          </SelectDateButton>
          {isOpenSelectPeriodDate && (
            <SelectPeriod>
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
            </SelectPeriod>
          )}
        </SelectDateWrapper>
        <Button variant="outlined" size="x-small" onClick={() => handlePeriod(null)}>
          조회
        </Button>
      </UserSelectPeriodContainer>
    </Layout>
  );
};

export default PeriodSelectionBar;

const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  user-select: none;
`;

const SelectButtonContainer = styled.div`
  display: flex;

  border-radius: 8px;
  border: 1px solid ${color.neutral[200]};

  background-color: ${color.white};

  :first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  :last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

type SelectButtonProps = {
  $isSelected: boolean;
};

const SelectButton = styled.button<SelectButtonProps>`
  padding: 10px 20px;

  border: 1px solid transparent;

  ${({ $isSelected }) => css`
    color: ${$isSelected && color.blue[500]};
    border-color: ${$isSelected && color.blue[500]};
  `}
`;

const UserSelectPeriodContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  button {
    flex: 1;
  }
`;

const SelectDateWrapper = styled.div`
  position: relative;

  display: flex;

  border-radius: 8px;
  border: 1px solid ${color.neutral[200]};

  background-color: ${color.white};

  & > :last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

type SelectedDateProps = {
  $hasSelectedCustomPeriod: boolean;
};

const SelectedDate = styled.div<SelectedDateProps>`
  padding: 10px 20px;

  min-width: 260px;

  border-right: 1px solid ${color.neutral[200]};

  ${({ $hasSelectedCustomPeriod }) => css`
    ${$hasSelectedCustomPeriod
      ? css`
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          justify-items: center;

          letter-spacing: 1.2px;
        `
      : css`
          text-align: center;
        `}
  `}
`;

const SelectDateButton = styled.div`
  display: flex;
  align-items: center;

  padding: 10px 20px;

  cursor: pointer;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${color.neutral[100]};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SelectPeriod = styled.div`
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
