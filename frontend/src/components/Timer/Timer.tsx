import { styled } from 'styled-components';

import Typography from '../common/Typography/Typography';
import useTimer from '../../hooks/useTimer';
import color from '../../styles/color';

type Props = {
  minutes: number;
};

const Timer = ({ minutes }: Props) => {
  const { start, stop, leftTime, isTicking } = useTimer(minutes);

  return (
    <Layout>
      <Typography variant="h1">{leftTime}</Typography>
      {isTicking ? <button onClick={stop}>정지</button> : <button onClick={start}>시작</button>}
    </Layout>
  );
};

export default Timer;

const Layout = styled.div`
  background-color: ${color.blue[500]};
`;
