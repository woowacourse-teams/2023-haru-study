import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/globalStyle';
import { lightTheme } from './styles/theme';
import Button from './components/Button/Button';
import Typography from './components/common/Typography/Typography';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={lightTheme}>
        <h1>Welcome Haru Study!</h1>
        <Button color="primary">Button</Button>
        <Typography variant="p1">Welcome Haru Study!</Typography>
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default App;
