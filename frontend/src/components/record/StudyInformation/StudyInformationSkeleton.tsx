import { styled, css } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import { TextSkeletonStyle } from '@Styles/common';

import CalenderIcon from '@Assets/icons/CalenderIcon';

import { StudyInfoContainer, StudyInformationLayout } from './style';

const StudyInformationSkeleton = () => {
  return (
    <StudyInformationLayout>
      <Typography
        variant="h2"
        $style={css`
          font-weight: 700;
          width: 80%;
          min-width: 400px;
          ${TextSkeletonStyle}

          @media screen and (max-width: 768px) {
            min-width: 100%;
          }
        `}
      >
        Loading
      </Typography>
      {Array.from({ length: 3 }).map((_, index) => (
        <StudyInfoContainerSkeleton key={index}>
          <CalenderIcon color="transparent" />
          <Typography variant="p2">Loading</Typography>
          <Typography variant="p2">Loading</Typography>
        </StudyInfoContainerSkeleton>
      ))}
    </StudyInformationLayout>
  );
};

export default StudyInformationSkeleton;

const StudyInfoContainerSkeleton = styled(StudyInfoContainer)`
  width: 300px;
  p {
    color: transparent;
  }
  ${TextSkeletonStyle}
`;
