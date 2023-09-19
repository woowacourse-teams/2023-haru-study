import { css, styled } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import color from '@Styles/color';

type Props = {
  height?: string;
  circleColor?: string;
};

const LoadingFallback = ({ height = '100%', circleColor = color.blue[500] }: Props) => {
  return (
    <Layout height={height}>
      <CircularProgress
        size="x-large"
        $style={css`
          border: 2px solid ${circleColor};
          border-color: ${circleColor} transparent transparent transparent;
        `}
      />
    </Layout>
  );
};

const Layout = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LoadingFallback;
