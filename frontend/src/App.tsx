import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import GlobalStyles from '@Styles/globalStyle';
import { lightTheme } from '@Styles/theme';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={lightTheme}>
        <Typography variant="h1">Welcome Haru Study!</Typography>
        <Button variant="secondary">Button</Button>
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default App;
