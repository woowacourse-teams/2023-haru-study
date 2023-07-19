import { styled } from 'styled-components';

import Sidebar from '@Components/board/Sidebar/Sidebar';

const StudyBoard = () => {
  return (
    <Layout>
      <Sidebar step="planning" cycle={1} minutes={10} />
    </Layout>
  );
};

export default StudyBoard;

const Layout = styled.div`
  width: 100%;
  display: flex;
`;
