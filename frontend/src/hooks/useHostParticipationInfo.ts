import { ChangeEventHandler, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useCopyClipBoard from './useCopyClipBoard';

const useHostParticipationInfo = () => {
  const [nickName, setNickName] = useState<string | null>(null);
  const [isInputError, setIsInputError] = useState<boolean>(false);

  const location = useLocation();
  const studyName = (location.state as { participantCode: string; studyName: string }).studyName;
  const participantCode = (location.state as { participantCode: string; studyName: string }).participantCode;

  const { onCopy } = useCopyClipBoard();

  const handleOnChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;

      if (value.length < 1 || value.length > 10) {
        return setIsInputError(true);
      }

      setNickName(e.target.value);
      setIsInputError(false);
    },
    [setNickName],
  );

  const handleOnClickClipBoardButton = async () => {
    await onCopy(participantCode);
    alert('클립보드에 복사되었습니다.');
  };

  const handleOnClickHelperMessage = () => {
    alert('참여 코드를 스터디원들과 공유하면 스터디원들의 회고와 기록을 확인할 수 있어요.');
  };

  return {
    studyName,
    nickName,
    participantCode,
    isInputError,
    handleOnChangeInput,
    handleOnClickClipBoardButton,
    handleOnClickHelperMessage,
  };
};

export default useHostParticipationInfo;
