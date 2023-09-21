import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import StudyEffectGuide from '../StudyEffectGuide/StudyEffectGuide';
import StudyStepGuide from '../StudyStepGuide/StudyStepGuide';

const GuideSection = () => {
  return (
    <Layout>
      <Introduce>
        <Typography variant="h2">하루스터디 학습 사이클</Typography>
        <Typography
          variant="p1"
          fontWeight="500"
          $style={css`
            word-break: keep-all;
          `}
        >
          한 사이클마다 <span>목표 설정 단계</span>, <span>학습 단계</span>, <span>회고 단계</span>로 구성되어 있으며,
          <br />세 가지 단계를 짧은 주기로 여러번 반복하여 학습합니다.
        </Typography>
      </Introduce>
      <StudyStepGuide />
      <StudyEffectGuide />
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

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 28px;
    }

    p {
      font-size: 20px;
    }
  }
`;
