import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import useCheckParticipationCode from '@Components/participation/hooks/useCheckParticipationCode';

import useInput from '@Hooks/common/useInput';

import { ROUTES_PATH } from '@Constants/routes';

const ParticipationCodeInput = () => {
  const navigate = useNavigate();

  const participantCodeInput = useInput(false);

  const { studyResult, authenticateParticipationCode, isLoading } = useCheckParticipationCode(
    participantCodeInput.state ?? '',
  );

  const handleOnClickParticipateButton = async () => {
    await authenticateParticipationCode();

    if (studyResult) {
      navigate(`${ROUTES_PATH.preparation}/${studyResult.studies[0].studyId}`, {
        state: { studyName: studyResult.studies[0].name },
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
        스터디 찾기
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
