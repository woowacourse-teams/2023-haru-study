import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';
import useRegisterParticipants from '@Components/participation/hooks/useRegisterParticipants';

import useInput from '@Hooks/common/useInput';

import { ERROR_MESSAGE } from '@Constants/errorMessage';
import { ROUTES_PATH } from '@Constants/routes';

type Props = {
  studyId: string;
  studyName: string;
};

const MemberRegister = ({ studyId, studyName }: Props) => {
  const navigate = useNavigate();

  const nickNameInput = useInput(true);

  const { isLoading, registerParticipants } = useRegisterParticipants(nickNameInput.state ?? '', studyId);

  const handleOnClickStartButton = async () => {
    await registerParticipants();

    return navigate(`${ROUTES_PATH.lobby}/${studyId}`, {
      state: { studyName },
    });
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
        스터디 입장하기
      </Button>
    </>
  );
};

export default MemberRegister;

const LabelContainer = styled.div`
  display: flex;
  gap: 5px;

  @media screen and (max-width: 768px) {
    h5 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.8rem;
    }
  }
`;
