import type { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

import Header from '@Components/common/Header/Header';

import color from '@Styles/color';

const RecordLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <Header />
      <ContentsContainer>{children}</ContentsContainer>
    </Layout>
  );
};

export default RecordLayout;

const Layout = styled.div`
  background-color: ${color.neutral[50]};

  min-height: 100vh;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  max-width: 1200px;

  margin: 0 auto;
  padding: 0px 60px;
  padding-bottom: 60px;

  @media screen and (max-width: 768px) {
    gap: 20px;

    width: 90%;

    padding: 0px;
    padding-bottom: 60px;
  }
`;
