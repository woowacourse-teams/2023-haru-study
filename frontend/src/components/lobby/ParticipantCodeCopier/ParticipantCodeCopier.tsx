import { memo } from 'react';
import { css, styled } from 'styled-components';

import Input from '@Components/common/Input/Input';

import useClipBoard from '@Hooks/common/useClipBoard';

import color from '@Styles/color';

import { useNotification } from '@Contexts/NotificationProvider';

import ClipBoardIcon from '@Assets/icons/ClipBoardIcon';

type Props = {
  participantCode: string;
};

const ParticipantCodeCopier = memo(({ participantCode }: Props) => {
  const { copy } = useClipBoard();
  const { send } = useNotification();

  const copyParticipantCode = async () => {
    await copy(participantCode);
    send({ message: '클립보드에 복사되었습니다.' });
  };

  return (
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
        <ClipBoardButton onClick={copyParticipantCode}>
          <ClipBoardIcon />
        </ClipBoardButton>
      </TextFieldContainer>
    </Input>
  );
});

export default ParticipantCodeCopier;

const TextFieldContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ClipBoardButton = styled.button`
  width: 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 10px;

  border: 1px solid ${color.neutral[200]};
  border-left: 0;
  border-radius: 0 7px 7px 0;

  transition: background-color 0.3s;

  &:hover {
    background-color: ${color.neutral[50]};
  }
`;
