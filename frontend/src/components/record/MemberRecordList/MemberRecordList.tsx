import { styled } from 'styled-components';

import MemberRecordItems from '../MemberRecordItems/MemberRecordItems';
import PaginationButton from '../PaginationButton/PaginationButton';
import PeriodSelectionBar from '../PeriodSelectionBar/PeriodSelectionBar';
import { useMemberRecordPeriod } from '../contexts/MemberRecordPeriodProvider';
import useMemberRecords from '../hooks/useMemberRecords';

type Props = {
  memberId: string;
};

const MemberRecordList = ({ memberId }: Props) => {
  const { fetchStartDate: startDate, fetchEndDate: endDate, period } = useMemberRecordPeriod();

  const { memberRecords, isLoading, totalPagesNumber, currentPageNumber, shiftPage } = useMemberRecords({
    memberId,
    startDate,
    endDate,
    period,
  });

  return (
    <Layout>
      <PeriodSelectionBar />
      <PaginationButton
        totalPagesNumber={totalPagesNumber}
        currentPageNumber={currentPageNumber}
        shiftPage={shiftPage}
      />
      <MemberRecordItems memberRecords={memberRecords} isLoading={isLoading} />
      <PaginationButton
        totalPagesNumber={totalPagesNumber}
        currentPageNumber={currentPageNumber}
        shiftPage={shiftPage}
      />
    </Layout>
  );
};

export default MemberRecordList;

const Layout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
