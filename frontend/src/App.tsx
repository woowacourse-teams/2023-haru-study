import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/globalStyle';
import { lightTheme } from './styles/theme';
import Button from './components/Button/Button';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={lightTheme}>
        <h1>Welcome Haru Study!</h1>
        <Button color="primary">Button</Button>
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default App;
