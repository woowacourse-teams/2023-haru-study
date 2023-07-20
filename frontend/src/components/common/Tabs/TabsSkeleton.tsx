import { styled } from 'styled-components';

import { TextSkeletonStyle } from '@Styles/common';

const TabsSkeleton = () => {
  return (
    <TabsLoadingLayout>
      <TopSkeleton />
      <MiddleSkeleton />
      <MiddleSkeleton />
      <ButtonSkeleton />
      <ButtonSkeleton />
    </TabsLoadingLayout>
  );
};

export default TabsSkeleton;

const TabsLoadingLayout = styled.div`
  display: grid;
  row-gap: 20px;

  padding: 40px 0px;
`;

const TopSkeleton = styled.div`
  height: 40px;

  ${TextSkeletonStyle}
`;

const MiddleSkeleton = styled.div`
  height: 30px;
  width: 80%;

  ${TextSkeletonStyle}
`;

const ButtonSkeleton = styled.div`
  height: 24px;
  width: 40%;

  ${TextSkeletonStyle}
`;
