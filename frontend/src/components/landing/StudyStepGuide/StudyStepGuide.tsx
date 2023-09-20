import { css, styled } from 'styled-components';

import Image from '@Components/common/Image/Image';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import planningStepJpg from '@Assets/image/planningStep.jpg';
import planningStepWebp from '@Assets/image/planningStep.webp';
import retrospectStepJpg from '@Assets/image/retrospectStep.jpg';
import retrospectStepWebp from '@Assets/image/retrospectStep.webp';
import studyingStepJpg from '@Assets/image/studyingStep.jpg';
import studyingStepWebp from '@Assets/image/studyingStep.webp';

const GUIDE = [
  {
    originUrl: planningStepJpg,
    webpUrl: planningStepWebp,
    title: '목표 설정 단계',
    description: `학습을 시작하기 전, 학습 목표를 설정하는 단계입니다.
    무엇을 학습할 것인지, 학습에 대한 완료 조건은 무엇인지 생각해 봅니다.
    (사이클 당 시간: 10분 이내)`,
  },
  {
    originUrl: studyingStepJpg,
    webpUrl: studyingStepWebp,
    title: '학습 단계',
    description: `학습 목표를 달성하기 위해 열심히 학습하는 단계입니다.
    (사이클 당 시간: 20~60분)`,
  },
  {
    originUrl: retrospectStepJpg,
    webpUrl: retrospectStepWebp,
    title: '회고 단계',
    description: `진행한 학습을 되돌아보는 단계입니다.
    회고를 완료했다면, 다시 목표 설정 단계로 돌아갑니다.
    (사이클 당 시간: 10분 이내)`,
  },
] as const;

const StudyStepGuide = () => {
  return (
    <Layout>
      {GUIDE.map(({ originUrl, webpUrl, title, description }, index) => (
        <StepGuide key={title} isEvenIndex={index % 2 === 0}>
          <StepGuideImage>
            <Image originUrl={originUrl} webpUrl={webpUrl} alt={title} />
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
  width: 40%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-right: auto;
  white-space: pre-line;

  @media screen and (max-width: 768px) {
    width: 100%;

    h2 {
      font-size: 32px;
    }

    p {
      font-size: 20px;
    }
  }
`;
