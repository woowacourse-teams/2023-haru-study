import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

const Login = () => {
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
        <Button variant="primary">로그인</Button>
        <Button variant="outlined">비회원으로 로그인</Button>
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
