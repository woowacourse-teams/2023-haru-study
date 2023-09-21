import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import { getUrlQuery } from '@Utils/getUrlQuery';

import { requestGuestLogin, requestOAuthLogin } from '@Apis/index';

import type { AuthProvider } from '@Types/auth';

const Auth = () => {
  const navigate = useNavigate();

  const provider = getUrlQuery<AuthProvider>('provider');
  const code = getUrlQuery('code');

  const requestAuthToken = useCallback(async () => {
    try {
      if (provider === 'guest') {
        const { accessToken } = await requestGuestLogin();
        sessionStorage.setItem('accessToken', accessToken);

        navigate(ROUTES_PATH.landing);
        return;
      }

      const { accessToken } = await requestOAuthLogin(provider, code);
      sessionStorage.setItem('accessToken', accessToken);

      navigate(ROUTES_PATH.landing);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      alert(error.message);

      navigate(ROUTES_PATH.login);
    }
  }, [code, provider, navigate]);

  useEffect(() => {
    requestAuthToken();
  }, [requestAuthToken]);

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
