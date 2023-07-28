import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';

import useInput from '@Hooks/common/useInput';

import { ROUTES_PATH } from '@Constants/routes';

type StudyInfo = {
  studyId: string;
  studyName: string;
  nickname: string | null;
};

const ParticipationCodeInput = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const participantCodeInput = useInput(false);

  const handleOnClickParticipateButton = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`api/studies/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participantCode: participantCodeInput.state }),
      });

      const { studyId, studyName } = (await response.json()) as StudyInfo;

      setIsLoading(false);

      navigate(`${ROUTES_PATH.preparation}/${studyId}`, {
        state: { participantCode: participantCodeInput.state, studyName, isHost: false },
      });
    } catch (error) {
      console.error(error);
      alert('해당 참여코드는 없는 코드입니다.');
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Input
        label={<Typography variant="p1">참여코드</Typography>}
        bottomText="스터디장에게 받은 참여코드를 입력하세요."
      >
        <Input.TextField onChange={participantCodeInput.onChangeInput} />
      </Input>

      <Button
        variant="primary"
        onClick={handleOnClickParticipateButton}
        disabled={!participantCodeInput.state}
        isLoading={isLoading}
      >
        스터디 참여하기
      </Button>
    </Layout>
  );
};

export default ParticipationCodeInput;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
