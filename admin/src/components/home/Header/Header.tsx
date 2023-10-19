import { styled } from 'styled-components';

const Header = () => {
  return (
    <Layout>
      <LogoText>
        <Emphasis>하루</Emphasis>스터디 관리자 페이지
      </LogoText>
    </Layout>
  );
};

export default Header;

const Layout = styled.header`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #e5e5e5;
`;

const LogoText = styled.h1`
  font-size: 3rem;
  font-weight: 200;
`;

const Emphasis = styled.span`
  color: #3b82f6;
`;
