import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCookie } from '@Utils/cookie';

import { requestCheckIsMember } from '@Apis/index';

const useCheckIsMember = (isHost: boolean, errorHandler: (error: Error) => void) => {
  const { studyId } = useParams();
  const memberId = getCookie('memberId');

  const [nickname, setNickname] = useState<string | null>(null);

  const restart = () => setNickname('');

  if (!studyId) {
    const error = new Error('잘못된 접근입니다.');
    errorHandler(error);
    throw error;
  }

  const authenticateMember = useCallback(async () => {
    if (isHost || !memberId) {
      return setNickname('');
    }

    const { nickname } = await requestCheckIsMember(studyId, memberId);

    if (!nickname) return setNickname('');

    setNickname(nickname);
  }, [studyId, isHost, memberId]);

  useEffect(() => {
    try {
      authenticateMember();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      errorHandler(error);
    }
  }, [authenticateMember, isHost, memberId, errorHandler]);

  return { studyId, nickname, restart };
};

export default useCheckIsMember;
