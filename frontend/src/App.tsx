import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ErrorFallback from '@Components/common/ErrorFallback/ErrorFallback';
import GlobalErrorBoundary from '@Components/common/GlobalErrorBoundary/GlobalErrorBoundary';

import GlobalStyles from '@Styles/globalStyle';
import { lightTheme } from '@Styles/theme';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';
import ModalProvider from '@Contexts/ModalProvider';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <ModalProvider>
        <GlobalErrorBoundary fallback={ErrorFallback}>
          <MemberInfoProvider>
            <Outlet />
          </MemberInfoProvider>
        </GlobalErrorBoundary>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default App;
