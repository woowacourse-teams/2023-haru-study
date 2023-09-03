import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import CircularProgress from '@Components/common/CircularProgress/CircularProgress';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';
import { useModal } from '@Contexts/ModalProvider';

import DownArrowIcon from '@Assets/icons/DownArrowIcon';
import haruServiceImage from '@Assets/image/haruServiceImage.png';

import LoginModal from '../LoginModal/LoginModal';

const LandingMainSection = () => {
  const { openModal } = useModal();
  const { data, isLoading } = useMemberInfo();
  const isLogin = !!data;

  return (
    <Layout>
      <LandingContents>
        <Typography variant="h2">
          하루스터디만의 학습 사이클로
          <br />
          학습 효율성을 끌어올립니다.
        </Typography>
        <Typography
          variant="p2"
          $style={css`
            color: ${color.neutral[500]};
          `}
        >
          하루스터디 어쩌구 설명
          <br />
          하루스터디 어쩌구 설명 하루스터디 어쩌구 설명 하루스터디 어쩌구
        </Typography>
        {isLoading ? (
          <ButtonLoading>
            <CircularProgress
              $style={css`
                border: 2px solid ${color.blue[500]};
                border-color: ${color.blue[500]} transparent transparent transparent;
              `}
            />
          </ButtonLoading>
        ) : (
          <ButtonContainer $isLogin={isLogin}>
            {isLogin ? (
              <>
                <Link to={ROUTES_PATH.create}>
                  <Button variant="primary">스터디 개설하기</Button>
                </Link>
                <Link to={ROUTES_PATH.participation}>
                  <Button variant="outlined">스터디 참여하기</Button>
                </Link>
              </>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  openModal(<LoginModal />);
                }}
              >
                하루스터디 시작하기
              </Button>
            )}
          </ButtonContainer>
        )}
      </LandingContents>
      <img src={haruServiceImage} alt="목표, 학습, 회고 스탭" />
      <LoadMoreContents>
        <Typography variant="p2">하루 스터디만의 학습 사이클이란?</Typography>
        <DownArrowIcon color={color.black} />
      </LoadMoreContents>
    </Layout>
  );
};

export default LandingMainSection;

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
  justify-items: center;
  column-gap: 40px;
  row-gap: 40px;

  padding: 0px 80px;

  height: calc(100vh - 140px);
  min-height: 800px;

  img {
    justify-self: flex-end;

    width: 800px;
    height: 600px;
  }
`;

const LandingContents = styled.div`
  justify-self: flex-start;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ButtonLoading = styled.div`
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

type ButtonContainerProps = {
  $isLogin: boolean;
};

const ButtonContainer = styled.div<ButtonContainerProps>`
  display: grid;
  column-gap: 10px;

  ${({ $isLogin }) => css`
    grid-template-columns: ${$isLogin ? '1fr 1fr' : '1fr'};
  `}
`;

const LoadMoreContents = styled.div`
  grid-column: 1 / -1;
  justify-items: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  svg {
    cursor: pointer;
  }
`;
