import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import useParticipationCode from '@Components/participation/hooks/useParticipationCode';

import useInput from '@Hooks/common/useInput';

import { ROUTES_PATH } from '@Constants/routes';

const ParticipationCodeInput = () => {
  const navigate = useNavigate();

  const participantCodeInput = useInput(false);

  const { authenticateParticipationCode, isLoading } = useParticipationCode(participantCodeInput.state ?? '');

  const handleOnClickParticipateButton = async () => {
    const result = await authenticateParticipationCode();

    if (result) {
      navigate(`${ROUTES_PATH.preparation}/${result.studies[0].studyId}`, {
        state: { participantCode: participantCodeInput.state, studyName: result.studies[0].name, isHost: false },
      });
    }
  };

  return (
    <Layout>
      <Input label="참여코드" bottomText="스터디장에게 받은 참여코드를 입력하세요.">
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
