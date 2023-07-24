import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';
import { TextSkeletonStyle } from '@Styles/common';

import CycleIcon from '@Assets/icons/CycleIcon';
import TimeLineIcon from '@Assets/icons/TimeLineIcon';

type Props = {
  studyName?: string;
  totalCycle?: number;
  timePerCycle?: number;
  $isLoading: boolean;
};

const StudyInformation = ({ studyName, totalCycle, timePerCycle, $isLoading }: Props) => {
  const iconColor = $isLoading ? 'transparent' : color.neutral[700];

  return (
    <StudyInformationLayout>
      <Typography
        variant="h2"
        $style={css`
          font-weight: 600;

          ${$isLoading &&
          css`
            width: 80%;
            min-width: 400px;
            ${TextSkeletonStyle}
          `}
        `}
      >
        {studyName} 스터디에서의 기록
      </Typography>
      <StudyInfoContainer $isLoading={$isLoading}>
        <CycleIcon color={iconColor} />
        <Typography variant="p2">진행한 총 사이클</Typography>
        <Typography variant="p2">{totalCycle}회</Typography>
      </StudyInfoContainer>
      <StudyInfoContainer $isLoading={$isLoading}>
        <TimeLineIcon color={iconColor} />
        <Typography variant="p2">사이클 당 학습 시간</Typography>
        <Typography variant="p2">{timePerCycle}분</Typography>
      </StudyInfoContainer>
    </StudyInformationLayout>
  );
};

export default StudyInformation;

const StudyInformationLayout = styled.div`
  display: grid;
  row-gap: 20px;

  h2 {
    margin-bottom: 20px;
  }
`;

type StudyInfoContainerType = {
  $isLoading: boolean;
};

const StudyInfoContainer = styled.div<StudyInfoContainerType>`
  display: grid;
  grid-template-columns: 20px 180px 60px;
  align-items: center;
  column-gap: 10px;

  :nth-child(3) {
    text-align: end;
  }

  p {
    font-weight: 600;
    color: ${color.neutral[700]};
  }

  ${({ $isLoading }) => css`
    ${$isLoading &&
    css`
      width: 300px;
      p {
        color: transparent;
      }
      ${TextSkeletonStyle}
    `}
  `}
`;
