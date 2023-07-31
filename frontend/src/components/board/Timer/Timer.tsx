import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import useTimer from '@Hooks/board/useTimer';

import color from '@Styles/color';

import type { Step } from '@Types/study';

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
  const { start, stop, getFormattedTime, isTicking } = useTimer(studyMinutes, step);

  const formattedTime = getFormattedTime();

  const buttonColor = BUTTON_COLOR[step];
  const buttonText = isTicking ? '정지' : '시작';
  const buttonAction = isTicking ? stop : start;

  return (
    <Layout>
      <Typography variant="p1" fontSize="3.6rem" color={color.white}>
        제한 시간
      </Typography>
      <Typography variant="h1" fontSize="12.8rem" color={color.white}>
        {formattedTime}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        onClick={buttonAction}
        $style={css`
          border: none;
        `}
      >
        <Typography variant="h5" color={buttonColor}>
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
`;
