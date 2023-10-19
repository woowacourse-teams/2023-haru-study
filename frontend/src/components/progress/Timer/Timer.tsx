import { useEffect } from 'react';
import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { STEP_KEYWORDS } from '@Constants/study';

import alarm from '@Assets/sounds/alarm.mp3';

import audioPlayer from '@Utils/audioPlayer';
import dom from '@Utils/dom';
import format from '@Utils/format';

import type { Step } from '@Types/study';

import useStepTimer from '../hooks/useStepTimer';

const alarmAudio = audioPlayer({ asset: alarm });

type Props = {
  studyMinutes: number;
  step: Step;
  currentCycle: number;
  lastModifiedDate: string;
};

const Timer = ({ studyMinutes, step, currentCycle, lastModifiedDate }: Props) => {
  const { leftSeconds } = useStepTimer({
    studyMinutes,
    step,
    lastModifiedDate,
    onComplete: alarmAudio.play,
  });

  const formattedTime = format.time(leftSeconds);

  useEffect(() => {
    dom.updateTitle(`${formattedTime} - 하루스터디`);

    return () => dom.updateTitle('하루스터디');
  }, [formattedTime]);

  return (
    <Layout>
      <Typography
        variant="p1"
        fontSize="3.6rem"
        color={color.white}
        $style={css`
          @media screen and (max-width: 768px) {
            display: none;
          }
        `}
      >
        제한 시간
      </Typography>
      <Typography
        variant="h1"
        fontSize="15rem"
        color={color.white}
        tabIndex={0}
        role="timer"
        aria-label={`남은 시간 ${formattedTime}`}
      >
        {`${formattedTime}`}
      </Typography>
      <Typography variant="p1" color={color.white}>
        {currentCycle}번째 사이클 - {STEP_KEYWORDS[step]}
      </Typography>
    </Layout>
  );
};

export default Timer;

const Layout = styled.div`
  width: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    line-height: 100%;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
    width: max-content;

    align-items: start;
    justify-content: flex-start;

    h1 {
      font-size: 5.2rem;
      margin-bottom: 0;
    }
  }
`;
