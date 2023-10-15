import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';

import useMutation from '@Hooks/api/useMutation';

import { ROUTES_PATH } from '@Constants/routes';

import { requestDeleteParticipant } from '@Apis/index';

type Props = {
  studyName: string;
  studyId: string;
  participantId: number;
  nickname: string;
  showMemberRegister: () => void;
};

const MemberRestart = ({ studyName, nickname, studyId, participantId, showMemberRegister }: Props) => {
  const navigate = useNavigate();

  const { mutate: deleteParticipant } = useMutation(() => requestDeleteParticipant(studyId, participantId));

  const handleOnClickContinueStart = async () => {
    navigate(`${ROUTES_PATH.progress}/${studyId}`);
  };

  const restart = async () => {
    await deleteParticipant();

    return showMemberRegister();
  };

  return (
    <Layout>
      <div>
        <Typography
          variant="p1"
          $style={css`
            margin-bottom: 25px;
          `}
        >
          <StudyNameText>{studyName}</StudyNameText> 스터디에서 이미 학습을 진행한 기록이 있습니다.
        </Typography>
        <Input label={<Typography variant="p1">닉네임</Typography>}>
          <Input.TextField value={nickname} disabled={!!nickname} />
        </Input>
      </div>
      <div>
        <Typography
          variant="p1"
          $style={css`
            text-align: center;
            margin-bottom: 20px;
          `}
        >
          학습을 이어서 진행 하시겠습니까?
        </Typography>
        <ButtonContainer>
          <Button
            variant="outlined"
            $style={css`
              width: 48%;
              padding: 16px 28px;
            `}
            onClick={restart}
          >
            처음부터 진행하기
          </Button>
          <Button
            variant="primary"
            $style={css`
              width: 48%;
              padding: 16px 28px;
            `}
            onClick={handleOnClickContinueStart}
          >
            이어서 진행하기
          </Button>
        </ButtonContainer>
      </div>
    </Layout>
  );
};

export default MemberRestart;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;

  @media screen and (max-width: 768px) {
    p {
      font-size: 2rem;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;

    button {
      width: 100%;
    }
  }
`;

const StudyNameText = styled.span`
  font-weight: 500;
`;
