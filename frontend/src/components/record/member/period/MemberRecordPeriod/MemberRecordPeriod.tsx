import { styled } from 'styled-components';

import useMemberListRecord from '../../../hooks/useMemberListRecord';
import MemberRecordPeriodList from '../MemberRecordPeriodList/MemberRecordPeriodList';
import PaginationButton from '../PaginationButton/PaginationButton';
import PeriodSelectionBar from '../PeriodSelectionBar/PeriodSelectionBar';

type Props = {
  memberId: string;
};

const MemberRecordPeriod = ({ memberId }: Props) => {
  const {
    memberRecords,
    isLoading,
    totalPagesNumber,
    currentPageNumber = 1,
    shiftPage,
  } = useMemberListRecord({
    memberId,
  });

  return (
    <Layout>
      <PeriodSelectionBar />
      {totalPagesNumber !== 0 && (
        <PaginationButton
          totalPagesNumber={totalPagesNumber}
          currentPageNumber={currentPageNumber}
          isLoading={isLoading}
          shiftPage={shiftPage}
        />
      )}
      <MemberRecordPeriodList memberRecords={memberRecords} isLoading={isLoading} />
      {memberRecords && memberRecords.length > 3 && (
        <PaginationButton
          totalPagesNumber={totalPagesNumber}
          currentPageNumber={currentPageNumber}
          isLoading={isLoading}
          shiftPage={shiftPage}
        />
      )}
    </Layout>
  );
};

export default MemberRecordPeriod;

const Layout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
