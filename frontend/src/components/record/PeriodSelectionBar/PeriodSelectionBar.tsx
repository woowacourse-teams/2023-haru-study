import { useState } from 'react';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';

import useOutsideClick from '@Hooks/common/useOutsideClick';

import color from '@Styles/color';

import { PERIOD } from '@Constants/record';

import CalenderIcon from '@Assets/icons/CalenderIcon';

import PeriodSelectCalendar from '../PeriodSelectCalendar/PeriodSelectCalendar';
import type { Period } from '../contexts/MemberRecordPeriodProvider';
import { useMemberRecordPeriod } from '../contexts/MemberRecordPeriodProvider';

const periodTypes: Period[] = ['week', 'oneMonth', 'threeMonth', 'entire'];

const PeriodSelectionBar = () => {
  const { period, startDate, endDate, hasSelectedCustomPeriod, handlePeriod } = useMemberRecordPeriod();

  const [isOpenPeriodSelectCalendar, setIsOpenPeriodSelectCalendar] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsOpenPeriodSelectCalendar(false);
  });

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
                <div>{startDate}</div>
                <div>~</div>
                <div>{endDate}</div>
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
        <Button variant="outlined" size="x-small" onClick={() => handlePeriod(null)}>
          조회
        </Button>
      </SelectCustomPeriodContainer>
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
  padding: 10px 20px;

  border: 1px solid transparent;

  ${({ $isSelected }) => css`
    color: ${$isSelected && color.blue[500]};
    border-color: ${$isSelected && color.blue[500]};
  `}
`;

const SelectCustomPeriodContainer = styled.div`
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
