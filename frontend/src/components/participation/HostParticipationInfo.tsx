import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';

import useHostParticipationInfo from '@Hooks/useHostParticipationInfo';

import color from '@Styles/color';

import { ERROR_MESSAGE } from '@Constants/errorMessage';

import ClipBoard from '@Assets/icons/ClipBoard';

const HostParticipationInfo = () => {
  const {
    nickName,
    isInputError,
    handleOnChangeInput,
    participantCode,
    studyName,
    handleOnClickClipBoardButton,
    handleOnClickHelperMessage,
    handleOnClickStartButton,
  } = useHostParticipationInfo();

  return (
    <Layout>
      <Container>
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
                <ClipBoard />
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
          <Input.TextField onChange={handleOnChangeInput} error={isInputError} />
        </Input>
        <Button variant="primary" disabled={isInputError || nickName === null} onClick={handleOnClickStartButton}>
          스터디 시작하기
        </Button>
      </Container>
    </Layout>
  );
};

export default HostParticipationInfo;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
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
