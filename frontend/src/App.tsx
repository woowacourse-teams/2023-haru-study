import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '@Styles/globalStyle';
import { lightTheme } from '@Styles/theme';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';

const App = () => {
  return (
    <MemberInfoProvider>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Outlet />
      </ThemeProvider>
    </MemberInfoProvider>
  );
};

export default App;
