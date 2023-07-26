import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';

import useParticipateStudy from '@Hooks/fetch/useParticipateStudy';
import useInput from '@Hooks/useInput';

import { ERROR_MESSAGE } from '@Constants/errorMessage';

import { getCookie } from '@Utils/cookie';

type Props = {
  studyName: string;
};

const NickNameNonExistence = ({ studyName }: Props) => {
  const navigator = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nickNameInput = useInput(true);

  const { participateStudy } = useParticipateStudy();

  const handleOnClickStartButton = async () => {
    try {
      setIsLoading(true);

      const studyId = getCookie('studyId');

      await participateStudy(studyId, nickNameInput.state);

      setIsLoading(false);

      if (studyId) {
        navigator(`/studyboard/${studyId}`);
      }
    } catch (error) {
      console.error(error);
      alert('스터디 방이 존재하지 않는 경우이거나, 닉네임에 문제가 있습니다.');
      setIsLoading(false);
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
        disabled={!nickNameInput.state || nickNameInput.isInputError}
        onClick={handleOnClickStartButton}
        isLoading={isLoading}
      >
        스터디 시작하기
      </Button>
    </>
  );
};

export default NickNameNonExistence;

const LabelContainer = styled.div`
  display: flex;
  gap: 5px;
`;
