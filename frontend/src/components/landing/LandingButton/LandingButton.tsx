import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';
import { useModal } from '@Contexts/ModalProvider';

import LoginModalContents from '../LoginModalContents/LoginModalContents';

const LandingButton = () => {
  const { openModal } = useModal();
  const memberInfo = useMemberInfo();
  const isLogin = !!memberInfo;
  const navigate = useNavigate();

  const handleClickStartButton = () => {
    if (isLogin) return navigate(`${ROUTES_PATH.mode}`);

    return openModal(<LoginModalContents />);
  };

  return (
    <ButtonContainer>
      <Button variant="primary" onClick={handleClickStartButton} $block={false} size="small">
        하루스터디 시작하기
      </Button>
    </ButtonContainer>
  );
};

export default LandingButton;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
