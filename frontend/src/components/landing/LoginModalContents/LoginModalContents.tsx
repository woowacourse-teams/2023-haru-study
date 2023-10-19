/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import ChatIcon from '@Assets/icons/ChatIcon';
import GoogleIcon from '@Assets/icons/GoogleIcon';

const GOOGLE_AUTH_REDIRECT_URI_PARAMETER = '/auth?provider=google';
const KAKAO_AUTH_REDIRECT_URI_PARAMETER = '/auth?provider=kakao';

const LoginModalContents = () => {
  const baseUri = `${window.location.protocol}//${window.location.host}`;

  const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${baseUri}${GOOGLE_AUTH_REDIRECT_URI_PARAMETER}`;
  const kakaoOAUthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${baseUri}${KAKAO_AUTH_REDIRECT_URI_PARAMETER}&response_type=code`;

  return (
    <Layout>
      <Typography
        variant="h1"
        $style={css`
          display: inline;

          font-size: 2.4rem;
          font-weight: 200;
        `}
      >
        <Emphasis>하루</Emphasis>스터디 로그인
      </Typography>
      <ButtonContainer>
        <a href={googleOAuthUrl}>
          <GoogleOAuthLoginButton variant="outlined">
            <GoogleIcon />
            <span>구글로 로그인</span>
          </GoogleOAuthLoginButton>
        </a>
        <a href={kakaoOAUthUrl}>
          <KakaoOAuthLoginButton variant="outlined">
            <ChatIcon color={color.black} />
            <span>카카오로 로그인</span>
          </KakaoOAuthLoginButton>
        </a>
        <DividedContainer>
          <DividedLine></DividedLine>
          <span>또는</span>
          <DividedLine></DividedLine>
        </DividedContainer>
        <NonMemberLoginButton>
          <Link to={`${ROUTES_PATH.auth}?provider=guest`}>비회원으로 로그인</Link>
        </NonMemberLoginButton>
      </ButtonContainer>
    </Layout>
  );
};

export default LoginModalContents;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;

  padding: 40px 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 360px;

  @media screen and (max-width: 768px) {
    width: 95%;
  }
`;

const OAutLoginButton = styled(Button)`
  position: relative;

  border-radius: 8px;

  font-size: 1.8rem;

  svg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 32px;

    width: 30px;
    height: 30px;

    display: flex;
    margin: auto 0;
  }
`;

const GoogleOAuthLoginButton = styled(OAutLoginButton)`
  border: 1px solid ${color.neutral[300]};

  color: ${color.black};
`;

const KakaoOAuthLoginButton = styled(OAutLoginButton)`
  border: none;

  color: rgba(0, 0, 0, 0.85);
  background-color: ${color.brand.kakao};

  &:hover {
    &:enabled {
      background-color: ${color.brand.kakao};
    }
  }
`;

const Emphasis = styled.span`
  color: ${color.blue[500]};
`;

const DividedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${color.neutral[600]};
`;

const DividedLine = styled.div`
  width: 40%;
  height: 1px;

  background-color: ${color.neutral[300]};
`;

const NonMemberLoginButton = styled.button`
  margin: 0 auto;

  a {
    text-decoration: underline;
    color: ${color.neutral[500]};
  }
`;
