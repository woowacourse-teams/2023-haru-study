import { styled, css } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import CalenderIcon from '@Assets/icons/CalenderIcon';
import CycleIcon from '@Assets/icons/CycleIcon';
import TimeLineIcon from '@Assets/icons/TimeLineIcon';

import date from '@Utils/date';

import StudyInformationSkeleton from './StudyInformationSkeleton';
import { StudyInfoContainer, StudyInformationLayout } from './style';
import useStudyData from '../hooks/useStudyData';

type Props = {
  studyId: string;
};

const StudyInformation = ({ studyId }: Props) => {
  const { studyBasicInfo, isLoading } = useStudyData(studyId);

  const displayDate = studyBasicInfo?.createdDateTime
    ? date.format(new Date(studyBasicInfo?.createdDateTime))
    : '/년 /월 /일';

  if (isLoading) {
    return <StudyInformationSkeleton />;
  }

  return (
    <StudyInformationLayout>
      <Title>
        <Typography
          variant="h2"
          $style={css`
            font-weight: 600;
          `}
        >
          {studyBasicInfo && `${studyBasicInfo.name} 스터디에서의 기록`}
        </Typography>
      </Title>
      <StudyInfoContainer>
        <Typography variant="p2">
          <CalenderIcon color={color.neutral[700]} />
          진행 날짜
        </Typography>
        <Typography variant="p2">{displayDate}</Typography>
      </StudyInfoContainer>
      <StudyInfoContainer>
        <Typography variant="p2">
          <CycleIcon color={color.neutral[700]} /> 진행한 총 사이클
        </Typography>
        <Typography variant="p2">{studyBasicInfo?.totalCycle}회</Typography>
      </StudyInfoContainer>
      <StudyInfoContainer>
        <Typography variant="p2">
          <TimeLineIcon color={color.neutral[700]} />
          사이클 당 학습 시간
        </Typography>
        <Typography variant="p2">{studyBasicInfo?.timePerCycle}분</Typography>
      </StudyInfoContainer>
    </StudyInformationLayout>
  );
};

export default StudyInformation;

const Title = styled.span`
  @media screen and (max-width: 768px) {
    h2 {
      font-size: 3.2rem;
    }
  }
`;
