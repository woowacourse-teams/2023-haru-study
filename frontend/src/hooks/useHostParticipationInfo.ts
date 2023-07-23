import { ChangeEventHandler, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { StudyParticipantPageType } from '@Types/location';

import useCopyClipBoard from '@Hooks/useCopyClipBoard';

import { getCookie, setCookie } from '@Utils/cookie';

import { startStudy } from '@Apis/index';

const useHostParticipationInfo = () => {
  const [nickName, setNickName] = useState<string | null>(null);
  const [isInputError, setIsInputError] = useState<boolean>(false);

  const {
    state: { participantCode, studyName },
  } = useLocation() as StudyParticipantPageType;

  const { onCopy } = useCopyClipBoard();

  const navigator = useNavigate();

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

  const handleOnClickStartButton = async () => {
    const response = await startStudy(nickName, getCookie('studyId'));

    const locationHeader = response.headers.get('Location');
    const memberId = locationHeader?.split('/').pop() as string;

    setCookie('memberId', memberId, 1);

    navigator('/studyboard');
  };

  return {
    studyName,
    nickName,
    participantCode,
    isInputError,
    handleOnChangeInput,
    handleOnClickClipBoardButton,
    handleOnClickHelperMessage,
    handleOnClickStartButton,
  };
};

export default useHostParticipationInfo;
