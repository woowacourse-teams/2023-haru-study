import { ReactNode } from 'react';
import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

type Props = {
  headerText: string;
  children: ReactNode;
};

const BeforeStudyTemplate = ({ headerText, children }: Props) => {
  return (
    <Layout>
      <Container>
        <Typography
          variant="h2"
          $style={css`
            margin-bottom: 80px;
          `}
        >
          {headerText}
        </Typography>
        {children}
      </Container>
    </Layout>
  );
};

export default BeforeStudyTemplate;

const Layout = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const Container = styled.div`
  width: 520px;
`;
