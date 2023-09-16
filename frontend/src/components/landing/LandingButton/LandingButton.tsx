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
          <Button variant="primary" $block={false} size="small">
            스터디 개설하기
          </Button>
        </Link>
        <Link to={ROUTES_PATH.participation}>
          <Button variant="outlined" $block={false} size="small">
            스터디 참여하기
          </Button>
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
        $block={false}
        size="small"
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
  display: flex;
  gap: 10px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
