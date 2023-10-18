import { Outlet } from 'react-router-dom';

import ResetStyles from '@Styles/reset';

import ModalProvider from '@Contexts/ModalProvider';

const App = () => {
  return (
    <>
      <ModalProvider>
        <ResetStyles />
        <Outlet />
      </ModalProvider>
    </>
  );
};

export default App;
