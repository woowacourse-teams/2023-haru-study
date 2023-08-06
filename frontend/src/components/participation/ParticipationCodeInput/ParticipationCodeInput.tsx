import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';

import useInput from '@Hooks/common/useInput';
import useParticipationCode from '@Hooks/participation/useParticipationCode';

import { ROUTES_PATH } from '@Constants/routes';

const ParticipationCodeInput = () => {
  const navigate = useNavigate();

  const participantCodeInput = useInput(false);

  const errorHandler = (error: Error) => {
    alert(error.message);
  };

  const { authenticateParticipationCode, isLoading } = useParticipationCode(errorHandler);

  const handleOnClickParticipateButton = async () => {
    if (!participantCodeInput.state) {
      alert('참여코드를 입력해주세요.');
      return;
    }

    const data = await authenticateParticipationCode(participantCodeInput.state);

    if (data) {
      navigate(`${ROUTES_PATH.preparation}/${data.studyId}`, {
        state: { participantCode: participantCodeInput.state, studyName: data.studyName, isHost: false },
      });
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
