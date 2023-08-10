import { css, styled } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import color from '@Styles/color';

import { getUrlQuery } from '@Utils/getUrlQuery';

import { requestGuestLogin, requestOAuthLogin } from '@Apis/index';

import type { AuthProvider } from '@Types/auth';

const Auth = () => {
  const provider = getUrlQuery<AuthProvider>('provider');
  const code = getUrlQuery('code');

  const requestAuthToken = async () => {
    if (provider === 'guest') {
      const { accessToken } = await requestGuestLogin();
      sessionStorage.setItem('accessToken', accessToken);

      return;
    }

    const { accessToken, refreshToken } = await requestOAuthLogin(provider, code);
    sessionStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // msw
    // landing page 이동

    // refreshToken 검사
  };

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
