import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import planningStep from '@Assets/image/planningStep.png';
import retrospectStep from '@Assets/image/retrospectStep.png';
import studyingStep from '@Assets/image/studyingStep.png';

const GUIDE = [
  {
    imageUrl: planningStep,
    title: '목표 설정 단계',
    description: `학습을 시작하기 전, 학습 목표를 설정하는 단계입니다.
    무엇을 학습할 것인지, 학습에 대한 완료 조건은 무엇인지 생각해봅니다.`,
    direction: 'default',
  },
  {
    imageUrl: studyingStep,
    title: '학습 단계',
    description: `학습 목표를 달성하기 위해 열심히 학습하는 단계입니다.`,
    direction: 'reverse',
  },
  {
    imageUrl: retrospectStep,
    title: '회고 단계',
    description: `진행한 학습을 되돌아보는 단계입니다.
    회고를 완료했다면, 다시 목표 설정 단계로 돌아갑니다.`,
    direction: 'default',
  },
] as const;

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
      <StepGuidList>
        {GUIDE.map(({ imageUrl, title, description, direction }) => {
          return (
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
          );
        })}
      </StepGuidList>
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

const StepGuidList = styled.div`
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

  p {
    word-break: keep-all;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 40px;

    h2 {
      font-size: 32px;
    }

    p {
      font-size: 20px;
    }
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
`;
