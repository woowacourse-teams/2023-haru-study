import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/globalStyle';
import { lightTheme } from './styles/theme';
import Typography from './components/common/Typography/Typography';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={lightTheme}>
        <Typography variant="h1">Welcome Haru Study!</Typography>
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default App;
