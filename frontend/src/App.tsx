import { Outlet } from 'react-router-dom';
import { ThemeProvider, css } from 'styled-components';
import GlobalStyles from './styles/globalStyle';
import { lightTheme } from './styles/theme';
import Typography from './components/common/Typography/Typography';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={lightTheme}>
        Welcome Haru Study!
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default App;
