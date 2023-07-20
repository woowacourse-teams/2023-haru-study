import { useLocation } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';

import useCopyClipBoard from '@Hooks/useCopyClipBoard';

import color from '@Styles/color';

import ClipBoard from '@Assets/icons/ClipBoard';

const HostParticipationInfo = () => {
  const location = useLocation();
  const studyName = (location.state as { participantCode: string; studyName: string }).studyName;
  const participantCode = (location.state as { participantCode: string; studyName: string }).participantCode;

  const { onCopy } = useCopyClipBoard();

  const handleOnClickClipBoardButton = () => {
    onCopy(participantCode).then(() => alert('클립보드에 복사되었습니다.'));
  };

  const handleOnClickHelperMessage = () => {
    alert('참여 코드를 스터디원들과 공유하면 스터디원들의 회고와 기록을 확인할 수 있어요.');
  };

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
        >
          <Input.TextField />
        </Input>
        <Button variant="primary">스터디 시작하기</Button>
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
