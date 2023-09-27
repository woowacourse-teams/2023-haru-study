import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { useProgressInfo, useStudyInfo } from '@Contexts/StudyProgressProvider';

import type { Step } from '@Types/study';

import Timer from '../Timer/Timer';

const SIDEBAR_INFO: Record<Step, { theme: string; stepKeyword: string; paragraph: string }> = {
  planning: {
    theme: color.blue[500],
    stepKeyword: '목표 설정',
    paragraph: '학습을 진행하기 전,\n학습 목표를 설정해주세요.',
  },
  studying: {
    theme: color.red[600],
    stepKeyword: '학습 진행',
    paragraph: '목표 달성을 위해\n학습을 바로 진행하세요.',
  },
  retrospect: {
    theme: color.teal[600],
    stepKeyword: '회고',
    paragraph: '분간의 학습이\n어땠는지 회고해보세요.',
  },
};

const Sidebar = () => {
  const { timePerCycle } = useStudyInfo();
  const { step, currentCycle } = useProgressInfo();

  if (step === 'done') return;

  const theme = SIDEBAR_INFO[step].theme;
  const stepKeyword = SIDEBAR_INFO[step].stepKeyword;
  const paragraph =
    step === 'retrospect' ? `${timePerCycle}${SIDEBAR_INFO[step].paragraph}` : SIDEBAR_INFO[step].paragraph;

  return (
    <Layout background={theme}>
      <Typography
        variant="h4"
        color={color.white}
        $style={css`
          margin-right: auto;
          white-space: pre-line;
        `}
        tabIndex={0}
        aria-label={paragraph}
        aria-live="assertive"
      >
        {paragraph}
      </Typography>
      <Timer studyMinutes={timePerCycle} step={step} />
      <Typography variant="p1" color={color.white}>
        {currentCycle}번째 사이클 - {stepKeyword}
      </Typography>
    </Layout>
  );
};

export default Sidebar;

const Layout = styled.div<{ background: string }>`
  width: 590px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 80px 90px;

  background-color: ${({ background }) => background};

  transition: background-color 0.5s ease-in-out;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 130px;

    align-items: flex-start;

    padding: 30px 20px 20px 20px;

    h4 {
      display: none;
    }

    p {
      font-size: 2rem;
    }
  }
`;
