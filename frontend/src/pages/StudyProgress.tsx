import { styled } from 'styled-components';

import StudyBoard from '@Components/progress/StudyBoard/StudyBoard';

import StudyProgressProvider from '@Contexts/StudyProgressProvider';

const StudyProgress = () => {
  return (
    <Layout>
      <StudyProgressProvider>
        <StudyBoard />
      </StudyProgressProvider>
    </Layout>
  );
};

export default StudyProgress;

const Layout = styled.div`
  width: 100%;
  height: 100%;
`;
