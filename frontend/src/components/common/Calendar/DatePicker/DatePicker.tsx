import { styled } from 'styled-components';

import color from '@Styles/color';

import ControlBar from './ControlBar/ControlBar';
import DatePickerProvider from './DatePickerContext/DatePickerProvider';
import DayList from './DayList/DayList';
import DayOfWeeks from '../common/DayOfWeeks/DayOfWeeks';

type Props = {
  startDate?: Date;
  endDate?: Date;
};

const DatePicker = ({ startDate, endDate }: Props) => {
  return (
    <DatePickerProvider initStartDate={startDate} initEndDate={endDate}>
      <Layout>
        <ControlBar />
        <DayOfWeeks position="center" />
        <DayList />
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

  z-index: 5;
`;
