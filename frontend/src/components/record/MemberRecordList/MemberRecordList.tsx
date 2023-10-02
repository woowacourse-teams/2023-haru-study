import { Suspense } from 'react';
import { styled } from 'styled-components';

import MemberRecordListSkeleton from './MemberRecordListSkeleton';
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
        <Suspense fallback={<MemberRecordListSkeleton />}>
          <MemberRecordItems memberId={memberId} />
        </Suspense>
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
