import { css, styled } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import color from '@Styles/color';

const Auth = () => {
  const urlSearchParams = new URL(window.location.href).searchParams;
  const provider = urlSearchParams.get('provider');
  const code = urlSearchParams.get('code');

  console.log(provider, code);

  return (
    <Layout>
      <CircularProgress
        $style={css`
          border: 2px solid ${color.blue[500]};
          border-color: ${color.blue[500]} transparent transparent transparent;
        `}
      />
    </Layout>
  );
};

export default Auth;

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
`;
