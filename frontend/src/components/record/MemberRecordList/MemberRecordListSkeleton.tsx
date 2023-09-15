import { styled } from 'styled-components';

import { TextSkeletonStyle } from '@Styles/common';

const MemberRecordListSkeleton = () => {
  return (
    <SkeletonLayout>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </SkeletonLayout>
  );
};

export default MemberRecordListSkeleton;

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
