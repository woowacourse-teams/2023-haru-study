import { Suspense } from 'react';
import { styled } from 'styled-components';

import MemberInfoGuard from '@Components/common/MemberInfoGuard/MemberInfoGuard';
import StudyBoard from '@Components/progress/StudyBoard/StudyBoard';

import StudyProgressProvider from '@Contexts/StudyProgressProvider';

import LoadingFallback from '../components/common/LodingFallback/LoadingFallback';

const StudyProgress = () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingFallback height="100vh" />}>
        <MemberInfoGuard>
          <StudyProgressProvider>
            <StudyBoard />
          </StudyProgressProvider>
        </MemberInfoGuard>
      </Suspense>
    </Layout>
  );
};

export default StudyProgress;

const Layout = styled.div`
  width: 100%;
  height: 100%;
`;
