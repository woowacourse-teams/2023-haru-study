import { useEffect } from 'react';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import dom from '@Utils/dom';
import format from '@Utils/format';

import type { Step } from '@Types/study';

import useStepTimer from '../hooks/useStepTimer';

const BUTTON_COLOR: Record<Step, string> = {
  planning: color.blue[500],
  studying: color.red[600],
  retrospect: color.teal[600],
};

type Props = {
  studyMinutes: number;
  step: Step;
};

const Timer = ({ studyMinutes, step }: Props) => {
  const { start, stop, leftSeconds, isTicking } = useStepTimer(studyMinutes, step);

  const formattedTime = format.time(leftSeconds);

  useEffect(() => {
    dom.updateTitle(formattedTime);

    return () => dom.updateTitle('하루스터디');
  }, [formattedTime]);

  const buttonColor = BUTTON_COLOR[step];
  const buttonText = isTicking ? '정지' : '시작';
  const buttonAction = isTicking ? stop : start;

  return (
    <Layout>
      <Typography variant="p1" fontSize="3.6rem" color={color.white}>
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
      <Button
        variant="outlined"
        size="small"
        onClick={buttonAction}
        aria-label="타이머 시작 및 일시정지 버튼"
        $style={css`
          border: none;
          border-radius: 14px;
          &:hover {
            &:enabled {
              background-color: ${color.white};
            }
          }
        `}
      >
        <Typography
          variant="h5"
          color={buttonColor}
          aria-label={`타이머 ${isTicking ? '시작' : '정지'}`}
          aria-live="assertive"
        >
          {buttonText}
        </Typography>
      </Button>
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
`;
