import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import Timer from '../Timer/Timer';

const SIDEBAR_INFO = {
  theme: {
    planning: color.blue[500],
    studying: color.red[600],
    retrospect: color.teal[600],
  },
  stepKeyword: {
    planning: '목표 설정',
    studying: '학습 진행',
    retrospect: '회고',
  },
  paragraph: {
    planning: '학습을 진행하기 전,\n학습 목표를 설정해주세요.',
    studying: '목표 달성을 위해\n학습을 바로 진행하세요.',
    retrospect: '30분간의 학습이\n어땠는지 회고해보세요.',
  },
};

type Props = {
  step: 'planning' | 'studying' | 'retrospect';
  cycle: number;
  minutes: number;
};

const Sidebar = ({ step, cycle, minutes }: Props) => {
  const theme = SIDEBAR_INFO.theme[step];
  const paragraph = SIDEBAR_INFO.paragraph[step];
  const stepKeyword = SIDEBAR_INFO.stepKeyword[step];

  return (
    <Layout background={theme}>
      <Typography
        variant="h4"
        color={color.white}
        $style={css`
          margin-right: auto;
          white-space: pre-line;
        `}
      >
        {paragraph}
      </Typography>
      <Timer minutes={minutes} buttonColor={theme} />
      <Typography variant="p1" color={color.white}>
        {cycle}번째 사이클 - {stepKeyword}
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
`;
