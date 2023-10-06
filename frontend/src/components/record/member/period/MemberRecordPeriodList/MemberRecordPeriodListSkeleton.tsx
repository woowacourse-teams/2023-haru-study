import { styled } from 'styled-components';

import { TextSkeletonStyle } from '@Styles/common';

const MemberRecordPeriodListSkeleton = () => {
  return (
    <SkeletonLayout>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </SkeletonLayout>
  );
};

export default MemberRecordPeriodListSkeleton;

const SkeletonLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  max-width: 1200px;
`;

const SkeletonItem = styled.div`
  height: 130px;
  ${TextSkeletonStyle}
`;
