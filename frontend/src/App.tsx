import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ErrorBoundary from '@Components/common/ErrorBoundary/ErrorBoundary';
import ErrorFallback from '@Components/common/ErrorFallback/ErrorFallback';

import GlobalStyles from '@Styles/globalStyle';
import { lightTheme } from '@Styles/theme';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';
import ModalProvider from '@Contexts/ModalProvider';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <ModalProvider>
        <MemberInfoProvider>
          <ErrorBoundary fallback={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </MemberInfoProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default App;
