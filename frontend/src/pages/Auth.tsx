import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfoAction } from '@Contexts/MemberInfoProvider';
import { useModal } from '@Contexts/ModalProvider';

import tokenStorage from '@Utils/tokenStorage';
import url from '@Utils/url';

import { requestPostGuestLogin, requestPostOAuthLogin } from '@Apis/index';

import type { AuthProvider } from '@Types/auth';

const Auth = () => {
  const { refetchMemberInfo: fetchMemberInfo } = useMemberInfoAction();

  const navigate = useNavigate();
  const { closeModal } = useModal();

  const provider = url.getQueryString<AuthProvider>('provider');
  const code = url.getQueryString('code');

  const requestAuthToken = useCallback(async () => {
    let accessToken: string;

    if (provider === 'guest') {
      accessToken = (await requestPostGuestLogin()).data.accessToken;
    } else {
      accessToken = (await requestPostOAuthLogin(provider, code)).data.accessToken;
    }

    fetchMemberInfo();

    tokenStorage.setAccessToken(accessToken);
    navigate(ROUTES_PATH.landing);
  }, [code, provider, fetchMemberInfo, navigate]);

  useEffect(() => {
    requestAuthToken();
    closeModal();
  }, [closeModal, requestAuthToken]);

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
