import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';

import useInput from '@Hooks/common/useInput';
import useRegisterMember from '@Hooks/preparation/useRegisterMember';

import { ERROR_MESSAGE } from '@Constants/errorMessage';
import { ROUTES_PATH } from '@Constants/routes';

type Props = {
  studyId: string;
  studyName: string;
};

const MemberRegister = ({ studyId, studyName }: Props) => {
  const navigate = useNavigate();

  const errorHandler = (message: string) => {
    alert(message);
  };

  const { isLoading, resgisterMember } = useRegisterMember(errorHandler);

  const nickNameInput = useInput(true);

  const handleOnClickStartButton = async () => {
    if (!nickNameInput.state || !studyId) return;

    await resgisterMember(nickNameInput.state, studyId);

    navigate(`${ROUTES_PATH.board}/${studyId}`);
  };
  return (
    <>
      <Input
        label={
          <LabelContainer>
            <Typography variant="h5">{studyName}</Typography>
            <Typography variant="p1">스터디에서 사용할 닉네임</Typography>
          </LabelContainer>
        }
        errorMessage={ERROR_MESSAGE.nickName}
      >
        <Input.TextField maxLength={10} onChange={nickNameInput.onChangeInput} error={nickNameInput.isInputError} />
      </Input>
      <Button
        variant="primary"
        disabled={nickNameInput.isInputError || nickNameInput.state === null}
        onClick={handleOnClickStartButton}
        isLoading={isLoading}
      >
        스터디 시작하기
      </Button>
    </>
  );
};

export default MemberRegister;

const LabelContainer = styled.div`
  display: flex;
  gap: 5px;
`;
