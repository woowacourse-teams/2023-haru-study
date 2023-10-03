import { styled } from 'styled-components';

import MemberRecordItems from '../MemberRecordItems/MemberRecordItems';
import PeriodSelectionBar from '../PeriodSelectionBar/PeriodSelectionBar';
import MemberRecordPeriodProvider from '../contexts/MemberRecordPeriodProvider';

type Props = {
  memberId: string;
};

const MemberRecordList = ({ memberId }: Props) => {
  return (
    <Layout>
      <MemberRecordPeriodProvider>
        <PeriodSelectionBar />
        <MemberRecordItems memberId={memberId} />
      </MemberRecordPeriodProvider>
    </Layout>
  );
};

export default MemberRecordList;

const Layout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
