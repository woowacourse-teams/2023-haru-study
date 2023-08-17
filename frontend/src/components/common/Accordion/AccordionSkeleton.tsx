import { styled } from 'styled-components';

import { TextSkeletonStyle } from '@Styles/common';

const AccordionSkeleton = () => {
  return (
    <AccordionSkeletonLayout>
      <SkeletonItem />
      <SkeletonItem />
    </AccordionSkeletonLayout>
  );
};

export default AccordionSkeleton;

const AccordionSkeletonLayout = styled.ul`
  display: grid;
  row-gap: 40px;

  max-width: 1200px;
`;

const SkeletonItem = styled.li`
  height: 80px;
  ${TextSkeletonStyle}
`;
