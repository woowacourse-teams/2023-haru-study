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
        스터디를 시작해 보세요.
      </Typography>
      <ButtonContainer>
        <Link to={ROUTES_PATH.mode}>
          <Button variant="primary" size="small" $block={false}>
            스터디 시작하기
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

  padding-top: 40px;

  svg {
    width: 80px;
    height: 80px;
  }

  @media screen and (max-width: 768px) {
    gap: 20px;

    padding-top: 20px;

    p {
      font-size: 1.6rem;
    }

    svg {
      width: 60px;
      height: 60px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;

  @media screen and (max-width: 768px) {
    button {
      font-size: 1.6rem;
    }
  }
`;
