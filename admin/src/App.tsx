import { Outlet } from 'react-router-dom';

import ResetStyles from '@Styles/reset';

const App = () => {
  return (
    <>
      <ResetStyles />
      <Outlet />
    </>
  );
};

export default App;
