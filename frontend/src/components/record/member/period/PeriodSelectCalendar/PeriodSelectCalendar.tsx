import { styled } from 'styled-components';

import DatePicker from '@Components/common/Calendar/DatePicker/DatePicker';
import { useMemberRecordPeriod } from '@Components/record/contexts/MemberRecordPeriodProvider';

const PeriodSelectCalendar = () => {
  const { startDate, endDate, updateStartEndDate } = useMemberRecordPeriod();

  return (
    <Layout>
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        onChangeDate={(start, end) => updateStartEndDate(start, end)}
      />
    </Layout>
  );
};

export default PeriodSelectCalendar;

const Layout = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  left: 0;

  z-index: 5;
`;
