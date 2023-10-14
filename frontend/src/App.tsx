import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ErrorBoundary from '@Components/common/ErrorBoundary/ErrorBoundary';
import ErrorFallback from '@Components/common/ErrorFallback/ErrorFallback';
import ScrollToTop from '@Components/common/ScrollToTop/ScrollToTop';

import GlobalStyles from '@Styles/globalStyle';
import { lightTheme } from '@Styles/theme';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';
import ModalProvider from '@Contexts/ModalProvider';
import NotificationProvider from '@Contexts/NotificationProvider';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <NotificationProvider>
        <ModalProvider>
          <MemberInfoProvider>
            <ErrorBoundary fallback={ErrorFallback}>
              <Suspense>
                <ScrollToTop />
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </MemberInfoProvider>
        </ModalProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
