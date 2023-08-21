/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import GoogleIcon from '@Assets/icons/GoogleIcon';

const REDIRECT_URI_PARAMETER = '/auth?provider=google';

const Login = () => {
  const baseUri = `${window.location.protocol}//${window.location.host}`;

  const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${baseUri}${REDIRECT_URI_PARAMETER}`;

  return (
    <Layout>
      <Typography
        variant="h1"
        $style={css`
          display: inline;

          font-size: 6rem;
          font-weight: 200;
        `}
      >
        <Emphasis>하루</Emphasis>스터디
      </Typography>
      <ButtonContainer>
        <a href={googleOAuthUrl}>
          <Button
            variant="outlined"
            $style={css`
              border-radius: 8px;
              border: 1px solid ${color.neutral[300]};
              color: ${color.black};
              font-size: 1.8rem;
            `}
          >
            <GoogleIcon />
            <LoginText>구글로 로그인</LoginText>
          </Button>
        </a>
        <DividedLine>
          <div></div>
          <span>또는</span>
          <div></div>
        </DividedLine>
        <NonMemberLoginButton>
          <Link to={`${ROUTES_PATH.auth}?provider=guest`}>비회원으로 로그인</Link>
        </NonMemberLoginButton>
      </ButtonContainer>
    </Layout>
  );
};

export default Login;

const Layout = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 360px;

  svg {
    position: absolute;
    top: 0;
    bottom: 0;

    display: flex;
    margin: auto 0;
  }
`;

const LoginText = styled.span`
  position: relative;
`;

const Emphasis = styled.span`
  color: ${color.blue[500]};
`;

const DividedLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    width: 40%;
    height: 1px;

    background-color: ${color.neutral[300]};
  }
`;

const NonMemberLoginButton = styled.button`
  margin: 0 auto;

  a {
    text-decoration: underline;
    color: ${color.neutral[500]};
  }
`;
