import type { ReactNode } from 'react';
import { css, styled } from 'styled-components';

import Header from '@Components/common/Header/Header';
import Typography from '@Components/common/Typography/Typography';

type Props = {
  headerText: string;
  children: ReactNode;
};

const StudyParticipationLayout = ({ headerText, children }: Props) => {
  return (
    <>
      <Header />
      <Layout>
        <Typography
          variant="h2"
          $style={css`
            margin-bottom: 80px;
          `}
        >
          {headerText}
        </Typography>
        {children}
      </Layout>
    </>
  );
};

export default StudyParticipationLayout;

const Layout = styled.div`
  width: 520px;
  margin: 0 auto;
  padding-bottom: 60px;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
