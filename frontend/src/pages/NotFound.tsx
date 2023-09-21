import { Link } from 'react-router-dom';
import { ThemeProvider, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';
import GlobalStyles from '@Styles/globalStyle';
import { lightTheme } from '@Styles/theme';

import { ROUTES_PATH } from '@Constants/routes';

const NotFound = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Layout>
        <PageStatus>404</PageStatus>
        <div>
          <Typography variant="p3">
            요청한 페이지를 찾을 수 없습니다.
            <br />
            입력하신 주소를 다시 한번 확인해주세요.
          </Typography>
        </div>
        <Link to={ROUTES_PATH.landing}>홈으로 이동하기</Link>
      </Layout>
    </ThemeProvider>
  );
};

export default NotFound;

const Layout = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  p {
    text-align: center;
  }

  a {
    color: ${color.blue[500]};
    text-decoration: underline;
  }
`;

const PageStatus = styled.div`
  font-size: 6rem;
  font-weight: 500;
  color: ${color.neutral[600]};
`;
