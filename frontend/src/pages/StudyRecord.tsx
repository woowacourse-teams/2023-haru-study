import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';
import RecordContents from '@Components/record/RecordContents';

import color from '@Styles/color';

const StudyRecord = () => {
  return (
    <StudyRecordLayout>
      <Header>
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
      </Header>
      <RecordContents />
    </StudyRecordLayout>
  );
};

export default StudyRecord;

const StudyRecordLayout = styled.div`
  background-color: ${color.neutral[50]};

  min-height: 100vh;
`;

const Header = styled.header`
  padding: 50px;
`;

const Emphasis = styled.span`
  color: ${color.blue[500]};
`;
