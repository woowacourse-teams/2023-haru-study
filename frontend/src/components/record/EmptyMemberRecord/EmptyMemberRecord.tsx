import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import PagesIcon from '@Assets/icons/PagesIcon';

const EmptyMemberRecord = () => {
  return (
    <Layout>
      <PagesIcon color={color.black} />
      <Typography
        variant="p3"
        $style={css`
          font-size: 2rem;
          text-align: center;
        `}
      >
        아직 완료한 스터디가 없어요.
        <br />
        스터디를 개설하거나 참여하여 스터디를 진행해보세요.
      </Typography>
      <ButtonContainer>
        <Link to={ROUTES_PATH.create}>
          <Button variant="primary" size="small" $block={false}>
            스터디 개설하기
          </Button>
        </Link>
        <Link to={ROUTES_PATH.participation}>
          <Button variant="outlined" size="small" $block={false}>
            스터디 참여하기
          </Button>
        </Link>
      </ButtonContainer>
    </Layout>
  );
};

export default EmptyMemberRecord;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  padding-top: 80px;

  svg {
    width: 80px;
    height: 80px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;
