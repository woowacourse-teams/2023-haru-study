import { styled } from 'styled-components';

import StudyBoard from '@Components/progress/StudyBoard/StudyBoard';

const StudyProgress = () => {
  return (
    <Layout>
      <StudyBoard />
    </Layout>
  );
};

export default StudyProgress;

const Layout = styled.div`
  width: 100%;
  height: 100%;
`;
