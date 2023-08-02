import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';

import useInput from '@Hooks/common/useInput';

import { ERROR_MESSAGE } from '@Constants/errorMessage';
import { ROUTES_PATH } from '@Constants/routes';

import { setCookie } from '@Utils/cookie';

import { requestRegisterMember } from '@Apis/index';

type Props = {
  studyId: string;
  studyName: string;
};

const MemberRegister = ({ studyId, studyName }: Props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nickNameInput = useInput(true);

  const handleOnClickStartButton = async () => {
    try {
      setIsLoading(true);

      if (!nickNameInput.state) throw Error('닉네임을 입력해주세요.');

      const { memberId } = await requestRegisterMember(nickNameInput.state, studyId);

      setCookie('memberId', memberId, 1);

      setIsLoading(false);

      navigate(`${ROUTES_PATH.board}/${studyId}`);
    } catch (error) {
      setIsLoading(false);

      if (!(error instanceof Error)) return error;

      alert(error.message);
    }
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
        <Input.TextField onChange={nickNameInput.onChangeInput} error={nickNameInput.isInputError} />
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
