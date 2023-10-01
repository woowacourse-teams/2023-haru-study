import { styled } from 'styled-components';

import EmptyMemberRecord from '../EmptyMemberRecord/EmptyMemberRecord';
import MemberRecordItem from '../MemberRecordItem/MemberRecordItem';
import useMemberRecords from '../hooks/useMemberRecords';

type Props = {
  memberId: string;
};

const MemberRecordList = ({ memberId }: Props) => {
  const { memberRecords, isLoading } = useMemberRecords(memberId);

  if (!isLoading && memberRecords.length === 0) return <EmptyMemberRecord />;

  return (
    <Layout>
      <MemberRecordItem memberRecords={memberRecords} />
    </Layout>
  );
};

export default MemberRecordList;

const Layout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
