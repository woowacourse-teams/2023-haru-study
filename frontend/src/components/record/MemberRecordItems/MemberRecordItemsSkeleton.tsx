import { styled } from 'styled-components';

import { TextSkeletonStyle } from '@Styles/common';

const MemberRecordItemsSkeleton = () => {
  return (
    <SkeletonLayout>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </SkeletonLayout>
  );
};

export default MemberRecordItemsSkeleton;

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
