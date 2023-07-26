import useParticipateStudy from '@Hooks/fetch/useParticipateStudy';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';

import { getCookie } from '@Utils/cookie';

import { NickNameExist } from './ParticipationInfo';

type Props = {
  studyName: string;
  responseNickName: string | null;
  changeNickNameExistence: React.Dispatch<React.SetStateAction<NickNameExist>>;
};

const NickNameExistence = ({ studyName, responseNickName, changeNickNameExistence }: Props) => {
  const navigator = useNavigate();

  const { participateStudy } = useParticipateStudy();

  const handleOnClickContinueStart = async () => {
    try {
      const studyId = getCookie('studyId');

      await participateStudy(studyId, responseNickName);

      if (studyId) {
        navigator(`/studyboard/${studyId}`);
      }
    } catch (error) {
      console.error(error);
      alert('스터디 방이 존재하지 않는 경우이거나, 닉네임에 문제가 있습니다.');
    }
  };

  const handleOnClickRestartButton = () => {
    changeNickNameExistence('notExist');
  };

  return (
    <>
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
          <Input.TextField value={responseNickName ?? ''} disabled={!!responseNickName} />
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
            onClick={handleOnClickRestartButton}
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
    </>
  );
};

export default NickNameExistence;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StudyNameText = styled.span`
  font-weight: 500;
`;
