import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';
import { useModal } from '@Contexts/ModalProvider';

import LoginModalContents from '../LoginModalContents/LoginModalContents';

const LandingButton = () => {
  const { openModal } = useModal();
  const memberInfo = useMemberInfo();
  const isLogin = !!memberInfo;

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
