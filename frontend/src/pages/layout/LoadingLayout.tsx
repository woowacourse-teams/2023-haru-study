import { css, styled } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import color from '@Styles/color';

const LoadingLayout = () => {
  return (
    <Layout>
      <CircularProgress
        size="x-large"
        $style={css`
          border: 2px solid ${color.blue[500]};
          border-color: ${color.blue[500]} transparent transparent transparent;
        `}
      />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LoadingLayout;
