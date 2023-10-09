import { styled } from 'styled-components';

import LoginForm from '@Components/login/LoginForm/LoginForm';

const Login = () => {
  return (
    <Layout>
      <LogoText>
        <Emphasis>하루</Emphasis>스터디
      </LogoText>
      <LoginForm />
    </Layout>
  );
};

export default Login;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;

const LogoText = styled.h1`
  font-size: 4rem;
  font-weight: 200;
`;

const Emphasis = styled.span`
  color: #3b82f6;
`;
