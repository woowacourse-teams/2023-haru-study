import { styled } from 'styled-components';

import AdminData from '@Components/home/AdminData/AdminData';
import Header from '@Components/home/Header/Header';
import SideNav from '@Components/home/SideNav/SideNav';

import AdminDataTypeProvider from '@Contexts/AdminDataTypeProvider';

const Home = () => {
  return (
    <>
      <Header />
      <Main>
        <AdminDataTypeProvider>
          <SideNav />
          <AdminData />
        </AdminDataTypeProvider>
      </Main>
    </>
  );
};

export default Home;

const Main = styled.main`
  display: flex;
`;
