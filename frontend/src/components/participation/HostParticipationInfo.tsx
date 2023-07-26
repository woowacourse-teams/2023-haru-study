import useParticipateStudy from '@Hooks/fetch/useParticipateStudy';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';

import useCopyClipBoard from '@Hooks/useCopyClipBoard';
import useInput from '@Hooks/useInput';

import color from '@Styles/color';

import { ERROR_MESSAGE } from '@Constants/errorMessage';

import ClipBoardIcon from '@Assets/icons/ClipBoardIcon';

import { getCookie } from '@Utils/cookie';

type Props = {
  participantCode: string;
  studyName: string;
};

const HostParticipationInfo = ({ participantCode, studyName }: Props) => {
  const navigator = useNavigate();

  const nickNameInput = useInput(true);

  const { onCopy } = useCopyClipBoard();

  const { participateStudy } = useParticipateStudy();

  const handleOnClickClipBoardButton = async () => {
    await onCopy(participantCode);
    alert('클립보드에 복사되었습니다.');
  };

  const handleOnClickHelperMessage = () => {
    alert('참여 코드를 스터디원들과 공유하면 스터디원들의 회고와 기록을 확인할 수 있어요.');
  };

  const handleOnClickStartButton = async () => {
    try {
      const studyId = getCookie('studyId');

      await participateStudy(studyId, nickNameInput.state);

      if (studyId) {
        navigator(`/studyboard/${studyId}`);
      }
    } catch (error) {
      console.error(error);
      alert('스터디 방이 존재하지 않는 경우이거나, 닉네임에 문제가 있습니다.');
    }
  };

  return (
    <Layout>
      <div>
        <Input
          label={<Typography variant="p1">참여코드</Typography>}
          bottomText="스터디 참여코드를 스터디원들에게 공유하세요."
        >
          <TextFieldContainer>
            <Input.TextField
              value={participantCode}
              $style={css`
                width: 80%;
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
              `}
              disabled
            />
            <ClipBoardButton onClick={handleOnClickClipBoardButton}>
              <ClipBoardIcon />
            </ClipBoardButton>
          </TextFieldContainer>
        </Input>
        <button onClick={handleOnClickHelperMessage}>
          <Typography
            variant="p2"
            $style={css`
              text-decoration: underline;
              margin-top: 5px;
              color: ${color.neutral[400]};
              cursor: pointer;
            `}
          >
            참여코드를 왜 공유해야하나요?
          </Typography>
        </button>
      </div>
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
      >
        스터디 시작하기
      </Button>
    </Layout>
  );
};

export default HostParticipationInfo;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

const LabelContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const TextFieldContainer = styled.div<{ error?: boolean; id?: string }>`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ClipBoardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20%;
  border-radius: 7px;
  border: 1px solid ${color.neutral[200]};
  border-left: 0px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  margin-top: 10px;
`;
