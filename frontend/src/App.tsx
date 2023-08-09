import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '@Styles/globalStyle';
import { lightTheme } from '@Styles/theme';

import { ROUTES_PATH } from '@Constants/routes';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 인증 로직으로 유효한 토큰인지 확인하기 (api)
    const userToken = localStorage.getItem('token');

    if (!userToken) navigate(ROUTES_PATH.login);
  }, [navigate]);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
