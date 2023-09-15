import GoalIcon from '@Assets/icons/GoalIcon';
import PencilIcon from '@Assets/icons/PencilIcon';
import TimeLineIcon from '@Assets/icons/TimeLineIcon';
import Typography from '@Components/common/Typography/Typography';
import color from '@Styles/color';
import { styled } from 'styled-components';

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

const StudyEffectGuide = () => {
  return (
    <Layout>
      <Typography variant="h2">사이클 요소 별 학습 효과</Typography>
      <StudyEffectList>
        {STUDY_EFFECT.map(({ icon, title, description }) => (
          <StudyEffectItem key={title}>
            <StudyEffectTitle>
              {icon}
              {title}
            </StudyEffectTitle>
            <StudyEffectDescription>{description}</StudyEffectDescription>
          </StudyEffectItem>
        ))}
      </StudyEffectList>
    </Layout>
  );
};

export default StudyEffectGuide;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  h2 {
    text-align: center;

    @media screen and (max-width: 768px) {
      font-size: 28px;
    }
  }
`;

const StudyEffectList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
  font-size: 20px;
  word-break: keep-all;
`;
