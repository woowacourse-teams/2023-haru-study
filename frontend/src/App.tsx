import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Accordion from '@Components/common/Accordion/Accordion';
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
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>
              <p>노아의 기록</p>
            </Accordion.Header>
            <Accordion.Panel>
              <div>이런 저런 공부를 해요</div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default App;
