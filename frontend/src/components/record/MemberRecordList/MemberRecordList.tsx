import { useState } from 'react';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import useCalendar from '@Hooks/common/useCalendar';
import useOutsideClick from '@Hooks/common/useOutsideClick';

import color from '@Styles/color';

import ArrowIcon from '@Assets/icons/ArrowIcon';
import CalenderIcon from '@Assets/icons/CalenderIcon';

import format from '@Utils/format';

import CalendarDayOfWeeks from '../CalendarDayOfWeeks/CalendarDayOfWeeks';
import EmptyMemberRecord from '../EmptyMemberRecord/EmptyMemberRecord';
import MemberRecordItems from '../MemberRecordItems/MemberRecordItems';
import useMemberRecords from '../hooks/useMemberRecords';

type Props = {
  memberId: string;
};

const PERIOD = {
  week: '1주일',
  oneMonth: '1개월',
  threeMonth: '3개월',
  entire: '전체 기간',
} as const;

const periodTypes: Period[] = ['week', 'oneMonth', 'threeMonth', 'entire'];

type Period = keyof typeof PERIOD;

const MemberRecordList = ({ memberId }: Props) => {
  const [isOpenSelectPeriodDate, setIsOpenSelectPeriodDate] = useState(false);
  const [selectedCustomPeriod, setSelectedCustomPeriod] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });
  const isSelectedCustomPeriod = !!selectedCustomPeriod.start || !!selectedCustomPeriod.end;
  const { year, month, monthStorage, handleMonthShift } = useCalendar();
  const { memberRecords, isLoading } = useMemberRecords(memberId);

  const [mouseHoverDay, setMouseHoverDay] = useState<string | null>(null);

  const handleHoverDays = (date: string) => {
    if (!selectedCustomPeriod.start) return;
    if (selectedCustomPeriod.start && selectedCustomPeriod.end) return;

    setMouseHoverDay(date);
  };

  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsOpenSelectPeriodDate(false);
  });

  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>('entire');

  const isSoonSelectedDate = (date: string) => {
    if (!mouseHoverDay || !selectedCustomPeriod.start) return;

    if (new Date(mouseHoverDay) > new Date(selectedCustomPeriod.start)) {
      if (new Date(selectedCustomPeriod.start) <= new Date(date) && new Date(mouseHoverDay) >= new Date(date))
        return true;

      return false;
    } else {
      if (new Date(selectedCustomPeriod.start) >= new Date(date) && new Date(mouseHoverDay) <= new Date(date))
        return true;

      return false;
    }
  };

  const isIncludeSelectDate = (date: string) => {
    if (!selectedCustomPeriod.start || !selectedCustomPeriod.end) return false;

    if (new Date(selectedCustomPeriod.start) < new Date(date) && new Date(selectedCustomPeriod.end) >= new Date(date))
      return true;

    return false;
  };

  const handleClickDay = (fullDateDot: string) => {
    setMouseHoverDay(fullDateDot);

    if (!selectedCustomPeriod.start) {
      setSelectedCustomPeriod({ start: fullDateDot, end: null });

      return;
    }

    if (!selectedCustomPeriod.end) {
      setSelectedCustomPeriod((prev) => {
        const startDateObject = new Date(prev.start!);
        const endDateObject = new Date(fullDateDot);

        if (startDateObject > endDateObject) return { start: fullDateDot, end: prev.start };
        return { ...prev, end: fullDateDot };
      });

      return;
    }

    setSelectedCustomPeriod({ start: fullDateDot, end: null });
  };

  if (!isLoading && memberRecords.length === 0) return <EmptyMemberRecord />;

  return (
    <Layout>
      <PeriodSelectionBar>
        <SelectButtonContainer>
          {periodTypes.map((periodType) => (
            <SelectButton
              $isSelected={selectedPeriod === periodType}
              onClick={() => setSelectedPeriod(periodType)}
              key={periodType}
            >
              {PERIOD[periodType]}
            </SelectButton>
          ))}
        </SelectButtonContainer>
        <UserSelectPeriodContainer>
          <SelectDateWrapper ref={ref}>
            <SelectedDate $isSelectedCustomPeriod={isSelectedCustomPeriod}>
              {isSelectedCustomPeriod ? (
                <>
                  <div>{selectedCustomPeriod.start}</div>
                  <div>~</div>
                  <div>{selectedCustomPeriod.end}</div>
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
                      onClick={() => handleClickDay(fullDateDot)}
                      onMouseEnter={() => handleHoverDays(fullDateDot)}
                      $isStartDate={selectedCustomPeriod.start === fullDateDot}
                      $isEndDate={selectedCustomPeriod.end === fullDateDot}
                      $isIncludeSelectDate={isIncludeSelectDate(fullDateDot)}
                      $isSoonSelectedDate={isSoonSelectedDate(fullDateDot) || false}
                      $isToday={fullDate === format.date(new Date())}
                    >
                      {day}
                    </Day>
                  ))}
                </Days>
              </SelectPeriod>
            )}
          </SelectDateWrapper>
          <Button variant="outlined" size="x-small" onClick={() => setSelectedPeriod(null)}>
            조회
          </Button>
        </UserSelectPeriodContainer>
      </PeriodSelectionBar>
      <MemberRecordItems memberRecords={memberRecords} />
    </Layout>
  );
};

export default MemberRecordList;

const Layout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const PeriodSelectionBar = styled.div`
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
  $isSelectedCustomPeriod: boolean;
};

const SelectedDate = styled.div<SelectedDateProps>`
  padding: 10px 20px;

  min-width: 260px;

  border-right: 1px solid ${color.neutral[200]};

  ${({ $isSelectedCustomPeriod }) => css`
    ${$isSelectedCustomPeriod
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
  $isStartDate: boolean;
  $isEndDate: boolean;
  $isIncludeSelectDate: boolean;
  $isSoonSelectedDate: boolean;
  $isToday: boolean;
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

  ${({ $isCurrentMonthDay, $isStartDate, $isEndDate, $isIncludeSelectDate, $isSoonSelectedDate, $isToday }) => css`
    opacity: ${$isCurrentMonthDay ? 1 : 0.4};
    background-color: ${$isStartDate || $isEndDate
      ? color.blue[200]
      : $isIncludeSelectDate || $isSoonSelectedDate
      ? color.blue[100]
      : $isToday && color.neutral[100]};
  `}
`;
