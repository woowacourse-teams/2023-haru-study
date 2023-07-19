import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Menu from '@Components/common/Menu/Menu';
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
        <Menu>
          <Menu.Item onClick={() => alert('아이템1을 클릭했습니다.')}>아이템1입니다.</Menu.Item>
          <Menu.Item onClick={() => alert('아이템2을 클릭했습니다.')}>아이템2</Menu.Item>
          <Menu.Item onClick={() => alert('아이템3을 클릭했습니다.')}>아이템3</Menu.Item>
          <Menu.Item onClick={() => alert('아이템4을 클릭했습니다.')}>아이템4</Menu.Item>
        </Menu>
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default App;
