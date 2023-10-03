import { useState } from 'react';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';

import useOutsideClick from '@Hooks/common/useOutsideClick';

import color from '@Styles/color';

import { PERIOD } from '@Constants/record';

import { useNotification } from '@Contexts/NotificationProvider';

import CalenderIcon from '@Assets/icons/CalenderIcon';

import format from '@Utils/format';

import PeriodSelectCalendar from '../PeriodSelectCalendar/PeriodSelectCalendar';
import type { Period } from '../contexts/MemberRecordPeriodProvider';
import { useMemberRecordPeriod } from '../contexts/MemberRecordPeriodProvider';

const periodTypes: Period[] = ['week', 'oneMonth', 'threeMonth', 'entire'];

const PeriodSelectionBar = () => {
  const { send } = useNotification();

  const { period, customStartDate, customEndDate, hasSelectedCustomPeriod, handlePeriod } = useMemberRecordPeriod();

  const [isOpenPeriodSelectCalendar, setIsOpenPeriodSelectCalendar] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsOpenPeriodSelectCalendar(false);
  });

  const handleCustomPeriodSearch = () => {
    if (!customStartDate || !customEndDate) {
      send({
        type: 'error',
        message: '날짜가 모두 입력되지 않았어요.',
      });

      return;
    }

    handlePeriod(null);
  };

  return (
    <Layout>
      <SelectPeriodButtonContainer>
        {periodTypes.map((periodType) => (
          <SelectPeriodButton
            $isSelected={period === periodType}
            onClick={() => handlePeriod(periodType)}
            key={periodType}
          >
            {PERIOD[periodType]}
          </SelectPeriodButton>
        ))}
      </SelectPeriodButtonContainer>
      <SelectCustomPeriodContainer>
        <SelectDateWrapper ref={ref}>
          <SelectedDate $hasSelectedCustomPeriod={hasSelectedCustomPeriod}>
            {hasSelectedCustomPeriod ? (
              <>
                <div>{customStartDate && format.date(customStartDate)}</div>
                <div>~</div>
                <div>{customEndDate && format.date(customEndDate)}</div>
              </>
            ) : (
              '날짜를 선택해주세요.'
            )}
          </SelectedDate>
          <SelectDateButton onClick={() => setIsOpenPeriodSelectCalendar(true)}>
            <CalenderIcon color={color.black} />
          </SelectDateButton>
          {isOpenPeriodSelectCalendar && <PeriodSelectCalendar />}
        </SelectDateWrapper>
        <Button variant="outlined" size="x-small" onClick={handleCustomPeriodSearch}>
          조회
        </Button>
      </SelectCustomPeriodContainer>
    </Layout>
  );
};

export default PeriodSelectionBar;

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 20px;

  user-select: none;

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
    flex-direction: column;
    align-items: self-start;

    button {
      font-size: 1.4rem;
    }
  }
`;

const SelectPeriodButtonContainer = styled.div`
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

type SelectPeriodButtonProps = {
  $isSelected: boolean;
};

const SelectPeriodButton = styled.button<SelectPeriodButtonProps>`
  padding: 8px 20px;

  border: 1px solid transparent;

  ${({ $isSelected }) => css`
    color: ${$isSelected && color.blue[500]};
    border-color: ${$isSelected && color.blue[500]};
  `}

  @media screen and (max-width: 768px) {
    padding: 4px 10px;
  }
`;

const SelectCustomPeriodContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    flex: 1;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
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

  min-width: 300px;

  border-right: 1px solid ${color.neutral[200]};

  ${({ $hasSelectedCustomPeriod }) => css`
    ${$hasSelectedCustomPeriod
      ? css`
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          justify-items: center;
        `
      : css`
          text-align: center;
          opacity: 0.5;
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
