import { styled } from 'styled-components';

import MemberRecordItems from '../MemberRecordItems/MemberRecordItems';
import PaginationButton from '../PaginationButton/PaginationButton';
import PeriodSelectionBar from '../PeriodSelectionBar/PeriodSelectionBar';
import useMemberListRecord from '../hooks/useMemberListRecord';

type Props = {
  memberId: string;
};

const MemberRecordList = ({ memberId }: Props) => {
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
      <PaginationButton
        totalPagesNumber={totalPagesNumber}
        currentPageNumber={currentPageNumber}
        isLoading={isLoading}
        shiftPage={shiftPage}
      />
      <MemberRecordItems memberRecords={memberRecords} isLoading={isLoading} />
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

export default MemberRecordList;

const Layout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
