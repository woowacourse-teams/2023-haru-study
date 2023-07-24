import { ReactNode } from 'react';
import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

type Props = {
  headerText: string;
  children: ReactNode;
};

const StudyInfoFormLayout = ({ headerText, children }: Props) => {
  return (
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
  );
};

export default StudyInfoFormLayout;

const Layout = styled.div`
  width: 520px;
  margin: 0 auto;
`;