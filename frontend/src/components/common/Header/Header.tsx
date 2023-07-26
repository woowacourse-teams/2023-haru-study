import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

import Typography from '../Typography/Typography';

const Header = () => {
  return (
    <Layout>
      <Link to="/">
        <Typography
          variant="h1"
          $style={css`
            font-size: 4rem;
            font-weight: 200;
          `}
        >
          <Emphasis>하루</Emphasis>스터디
        </Typography>
      </Link>
    </Layout>
  );
};

export default Header;

const Layout = styled.header`
  padding: 40px;
`;

const Emphasis = styled.span`
  color: ${color.blue[500]};
`;
