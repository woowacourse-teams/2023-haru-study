import planningStep from '@Assets/image/planningStep.png';
import retrospectStep from '@Assets/image/retrospectStep.png';
import studyingStep from '@Assets/image/studyingStep.png';
import Typography from '@Components/common/Typography/Typography';
import color from '@Styles/color';
import { css, styled } from 'styled-components';

const GUIDE = [
  {
    imageUrl: planningStep,
    title: '목표 설정 단계',
    description: `학습을 시작하기 전, 학습 목표를 설정하는 단계입니다.
    무엇을 학습할 것인지, 학습에 대한 완료 조건은 무엇인지 생각해 봅니다.
    (사이클 당 시간: 10분 이내)`,
  },
  {
    imageUrl: studyingStep,
    title: '학습 단계',
    description: `학습 목표를 달성하기 위해 열심히 학습하는 단계입니다.
    (사이클 당 시간: 20~60분)`,
  },
  {
    imageUrl: retrospectStep,
    title: '회고 단계',
    description: `진행한 학습을 되돌아보는 단계입니다.
    회고를 완료했다면, 다시 목표 설정 단계로 돌아갑니다.
    (사이클 당 시간: 10분 이내)`,
  },
] as const;

const StudyStepGuide = () => {
  return (
    <Layout>
      {GUIDE.map(({ imageUrl, title, description }, index) => (
        <StepGuide key={title} isEvenIndex={index % 2 === 0}>
          <StepGuideImage>
            <img src={imageUrl} alt={title} />
          </StepGuideImage>
          <StepGuideDescription>
            <Typography variant="h2">{title}</Typography>
            <Typography
              variant="p1"
              color={color.neutral[500]}
              fontWeight="500"
              $style={css`
                word-break: keep-all;
              `}
            >
              {description}
            </Typography>
          </StepGuideDescription>
        </StepGuide>
      ))}
    </Layout>
  );
};

export default StudyStepGuide;

const Layout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 135px;
`;

const StepGuide = styled.div<{ isEvenIndex: boolean }>`
  display: flex;
  flex-direction: ${({ isEvenIndex }) => (isEvenIndex ? 'row' : 'row-reverse')};
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

const StepGuideDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-right: auto;
  white-space: pre-line;

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 32px;
    }

    p {
      font-size: 20px;
    }
  }
`;
