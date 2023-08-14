/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

const REDIRECT_URI = '/auth?provider=google';

const Login = () => {
  const navigate = useNavigate();
  const baseUri = `${window.location.protocol}//${window.location.host}`;

  const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${baseUri}${REDIRECT_URI}`;

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
          <Button variant="primary">로그인</Button>
        </a>
        <Button
          variant="outlined"
          onClick={() => {
            navigate(`${ROUTES_PATH.auth}?provider=guest`);
          }}
        >
          비회원으로 로그인
        </Button>
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
`;

const Emphasis = styled.span`
  color: ${color.blue[500]};
`;
