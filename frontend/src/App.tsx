import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '@Styles/globalStyle';
import { lightTheme } from '@Styles/theme';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';
import ModalProvider from '@Contexts/ModalProvider';

const App = () => {
  return (
    <ModalProvider>
      <MemberInfoProvider>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyles />
          <Outlet />
        </ThemeProvider>
      </MemberInfoProvider>
    </ModalProvider>
  );
};

export default App;
