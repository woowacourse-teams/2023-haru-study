import { styled } from 'styled-components';

import color from '@Styles/color';

import ConfirmCancelButton from './ConfirmCancelButton/ConfirmCancelButton';
import ControlBar from './ControlBar/ControlBar';
import DatePickerProvider from './DatePickerContext/DatePickerProvider';
import DayList from './DayList/DayList';
import DayOfWeeks from '../common/DayOfWeeks/DayOfWeeks';

type Props = {
  /**
   * 시작일을 지정하는 속성.
   *
   *
   */
  startDate: Date | null;
  /**
   * 마지막일을 지정하는 속성.
   *
   */
  endDate: Date | null;
  /**
   * 달력의 개수를 지정하는 속성
   *
   *  * @default "single"
   */
  mode?: 'single' | 'double';
  /**
   * Date 선택 후 확인, 취소 버튼을 통해 startDate, endDate를 반환할 수 있는 버튼을 지정하는 속성.
   *
   *  * @default false
   */
  hasButton?: boolean;
  /**
   * 하루를 선택할지 혹은 기간을 선택할지를 지정하는 속성.
   *
   *  * @default false
   */
  isOnlyOneDay?: boolean;
  /**
   * startDate, endDate가 바뀔 때 호출되는 함수. startDate, endDate를 매개변수로 받음.
   *
   */
  onChangeDate?: (startDate: Date | null, endDate: Date | null) => void;
  /**
   * Date 선택 후 확인버튼을 누를 때 호출되는 함수. startDate, endDate를 매개변수로 받음.
   *
   */
  onClickConfirm?: (startDate: Date | null, endDate: Date | null) => void;
  /**
   * Date 선택 후 취소버튼을 누를 때 호출되는 함수. startDate, endDate를 매개변수로 받음.
   *
   */
  onClickCancel?: () => void;
};

const DatePicker = ({
  startDate,
  endDate,
  mode = 'single',
  hasButton = false,
  isOnlyOneDay = false,
  onClickCancel,
  onClickConfirm,
  onChangeDate,
}: Props) => {
  return (
    <DatePickerProvider
      initStartDate={startDate}
      initEndDate={endDate}
      mode={mode}
      isOnlyOneDay={isOnlyOneDay}
      onChangeDate={onChangeDate}
      onClickCancel={onClickCancel}
      onClickConfirm={onClickConfirm}
    >
      <Layout>
        <ControlBar />
        <DayOfWeeks position="center" />
        <DayList />
        {hasButton && <ConfirmCancelButton />}
      </Layout>
    </DatePickerProvider>
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
`;