import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import planningStep from '@Assets/image/planningStep.png';
import retrospectStep from '@Assets/image/retrospectStep.png';
import studyingStep from '@Assets/image/studyingStep.png';
import GoalIcon from '@Assets/icons/GoalIcon';
import PencilIcon from '@Assets/icons/PencilIcon';
import TimeLineIcon from '@Assets/icons/TimeLineIcon';

const GUIDE = [
  {
    imageUrl: planningStep,
    title: '목표 설정 단계',
    description: `학습을 시작하기 전, 학습 목표를 설정하는 단계입니다.
    무엇을 학습할 것인지, 학습에 대한 완료 조건은 무엇인지 생각해 봅니다.
    (사이클 당 시간: 10분 이내)`,
    direction: 'default',
  },
  {
    imageUrl: studyingStep,
    title: '학습 단계',
    description: `학습 목표를 달성하기 위해 열심히 학습하는 단계입니다.
    (사이클 당 시간: 20~60분)`,
    direction: 'reverse',
  },
  {
    imageUrl: retrospectStep,
    title: '회고 단계',
    description: `진행한 학습을 되돌아보는 단계입니다.
    회고를 완료했다면, 다시 목표 설정 단계로 돌아갑니다.
    (사이클 당 시간: 10분 이내)`,
    direction: 'default',
  },
] as const;

const STUDY_EFFECT = [
  {
    icon: <GoalIcon color={color.blue[500]} />,
    title: '목표 설정',
    description: `한 사이클의 학습을 시작하기 전, 학습목표와 완료 조건을 설정해 학습 방향성과 동기 부여를 제공합니다.`,
  },
  {
    icon: <PencilIcon color={color.teal[500]} />,
    title: '회고',
    description: `한 사이클의 학습이 끝난 후, 학습에 대해 스스로 피드백합니다. 피드백을 통해 전보다 더 개선된 학습이 되도록 합니다.`,
  },
  {
    icon: <TimeLineIcon color={color.neutral[900]} />,
    title: '단계별 타이머',
    description: `단계별로 시간을 제한하여 학습을 하는 동안 집중력을 잃지 않도록 도와줍니다.`,
  },
];

const GuideSection = () => {
  return (
    <Layout>
      <Introduce>
        <Typography variant="h2">하루스터디 학습 사이클</Typography>
        <Typography variant="p1" fontWeight="500">
          한 사이클마다 <span>목표 설정 단계</span>, <span>학습 단계</span>, <span>회고 단계</span>로 구성되어 있으며,
          <br />세 가지 단계를 짧은 주기로 여러번 반복하여 학습합니다.
        </Typography>
      </Introduce>
      <StepGuideList>
        {GUIDE.map(({ imageUrl, title, description, direction }) => (
          <StepGuide key={title} direction={direction}>
            <StepGuideImage>
              <img src={imageUrl} alt={title} />
            </StepGuideImage>
            <StepGuideContents>
              <Typography variant="h2">{title}</Typography>
              <Typography variant="p1" color={color.neutral[500]} fontWeight="500">
                {description}
              </Typography>
            </StepGuideContents>
          </StepGuide>
        ))}
      </StepGuideList>
      <StudyEffect>
        <Typography variant="h2">사이클 요소 별 학습 효과</Typography>
        <StudyEffectList>
          {STUDY_EFFECT.map(({ icon, title, description }) => (
            <StudyEffectItem>
              <StudyEffectTitle>
                {icon}
                {title}
              </StudyEffectTitle>
              <StudyEffectDescription>{description}</StudyEffectDescription>
            </StudyEffectItem>
          ))}
        </StudyEffectList>
      </StudyEffect>
    </Layout>
  );
};

export default GuideSection;

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 180px;

  padding: 135px 0;
`;

const Introduce = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  text-align: center;

  span:nth-child(1) {
    color: ${color.blue[500]};
  }

  span:nth-child(2) {
    color: ${color.red[500]};
  }

  span:nth-child(3) {
    color: ${color.teal[500]};
  }

  p {
    word-break: keep-all;
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 28px;
    }

    p {
      font-size: 20px;
    }
  }
`;

const StepGuideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 135px;
`;

const StepGuide = styled.div<{ direction: 'default' | 'reverse' }>`
  display: flex;
  flex-direction: ${({ direction }) => (direction === 'default' ? 'row' : 'row-reverse')};
  justify-content: center;
  align-items: center;
  gap: 80px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const StepGuideImage = styled.div`
  width: 55%;
  border-radius: 20px;

  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const StepGuideContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-right: auto;
  white-space: pre-line;

  p {
    word-break: keep-all;
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 32px;
    }

    p {
      font-size: 20px;
    }
  }
`;

const StudyEffect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  h2 {
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 28px;
    }
  }
`;

const StudyEffectList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 50px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const StudyEffectItem = styled.li`
  width: 400px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px;

  background-color: ${color.neutral[100]};
  border-radius: 14px;

  white-space: pre-line;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const StudyEffectTitle = styled.h6`
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 22px;
  font-weight: 500;
`;

const StudyEffectDescription = styled.p`
  word-break: keep-all;

  font-size: 20px;
`;
