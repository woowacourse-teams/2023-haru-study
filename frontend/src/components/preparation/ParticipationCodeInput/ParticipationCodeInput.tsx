import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';

import useInput from '@Hooks/common/useInput';

import { ROUTES_PATH } from '@Constants/routes';

import { requestAuthenticateParticipationCode } from '@Apis/index';

const ParticipationCodeInput = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const participantCodeInput = useInput(false);

  const handleOnClickParticipateButton = async () => {
    if (!participantCodeInput.state) return;

    setIsLoading(true);
    try {
      // memberId는 해당 api요청에 필요없기 때문에 삭제
      const { studyId, studyName } = await requestAuthenticateParticipationCode(participantCodeInput.state);

      setIsLoading(false);

      navigate(`${ROUTES_PATH.preparation}/${studyId}`, {
        state: { participantCode: participantCodeInput.state, studyName, isHost: false },
      });
    } catch (error) {
      setIsLoading(false);

      if (!(error instanceof Error)) throw error;

      alert(error.message);
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
        $style={css`
          margin-top: 25px;
        `}
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
