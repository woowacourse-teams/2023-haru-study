import { css, styled } from 'styled-components';

import Input from '@Components/common/Input/Input';

import useClipBoard from '@Hooks/common/useClipBoard';

import color from '@Styles/color';

import { useModal } from '@Contexts/ModalProvider';

import ClipBoardIcon from '@Assets/icons/ClipBoardIcon';

type Props = {
  participantCode: string;
};

const ParticipationCodeCopier = ({ participantCode }: Props) => {
  const { copy } = useClipBoard();
  const { openAlert } = useModal();

  const handleOnClickClipBoardButton = async () => {
    await copy(participantCode);
    openAlert('클립보드에 복사되었습니다.');
  };

  const handleOnClickHelperMessage = () => {
    openAlert('참여 코드를 스터디원들과 공유하면 스터디원들의 회고와 기록을 확인할 수 있어요.');
  };

  return (
    <div>
      <Input label="참여코드" bottomText="스터디 참여코드를 스터디원들에게 공유하세요.">
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
        <HelperText>참여코드를 왜 공유해야하나요?</HelperText>
      </button>
    </div>
  );
};

export default ParticipationCodeCopier;

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

const HelperText = styled.p`
  position: absolute;
  margin-top: 20px;

  font-size: 1.6rem;
  font-weight: 300;
  text-decoration: underline;
  color: ${color.neutral[400]};

  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
  }
`;
