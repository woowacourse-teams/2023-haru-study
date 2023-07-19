import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import useTimer from '@Hooks/useTimer';

import color from '@Styles/color';

type Props = {
  minutes: number;
  buttonColor: string;
};

const Timer = ({ minutes, buttonColor }: Props) => {
  const { start, stop, getFormattedTime, isTicking } = useTimer(minutes);

  const formattedTime = getFormattedTime();

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
