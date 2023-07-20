import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '@Styles/globalStyle';
import { lightTheme } from '@Styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
