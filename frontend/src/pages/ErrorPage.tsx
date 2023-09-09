import { Link } from 'react-router-dom';
import { ThemeProvider, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';
import GlobalStyles from '@Styles/globalStyle';
import { lightTheme } from '@Styles/theme';

import { ROUTES_PATH } from '@Constants/routes';

const ErrorPage = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Layout>
        <div>
          <Typography variant="p3">
            죄송합니다. 알 수 없는 에러가 발생했습니다.
            <br />
            잠시 후 다시 이용해주세요.
          </Typography>
        </div>
        <Link to={ROUTES_PATH.landing}>홈으로 이동하기</Link>
      </Layout>
    </ThemeProvider>
  );
};

export default ErrorPage;

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
