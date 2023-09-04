import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';
import { useModal } from '@Contexts/ModalProvider';

import LoginModalContents from '../LoginModalContents/LoginModalContents';

const LandingButton = () => {
  const { openModal } = useModal();
  const { data, isLoading } = useMemberInfo();
  const isLogin = !!data;

  if (isLoading) {
    return (
      <ButtonLoading>
        <CircularProgress
          $style={css`
            border: 2px solid ${color.blue[500]};
            border-color: ${color.blue[500]} transparent transparent transparent;
          `}
        />
      </ButtonLoading>
    );
  }

  if (isLogin) {
    return (
      <ButtonContainer $isLogin={isLogin}>
        <Link to={ROUTES_PATH.create}>
          <Button variant="primary">스터디 개설하기</Button>
        </Link>
        <Link to={ROUTES_PATH.participation}>
          <Button variant="outlined">스터디 참여하기</Button>
        </Link>
      </ButtonContainer>
    );
  }

  return (
    <ButtonContainer $isLogin={isLogin}>
      <Button
        variant="primary"
        onClick={() => {
          openModal(<LoginModalContents />);
        }}
      >
        하루스터디 시작하기
      </Button>
    </ButtonContainer>
  );
};

export default LandingButton;

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

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    row-gap: 20px;
  }
`;
