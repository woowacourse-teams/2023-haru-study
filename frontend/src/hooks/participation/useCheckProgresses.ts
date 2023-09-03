import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { requestDeleteProgress, requestGetCheckProgresses } from '@Apis/index';

import { ApiError } from '../../errors';

const useCheckProgresses = (isHost: boolean) => {
  const { studyId } = useParams();

  const { data: memberInfo } = useMemberInfo();

  const [nickname, setNickname] = useState<string | null>(null);

  const [progressId, setProgressId] = useState<number>(0);

  if (!studyId) {
    const error = new Error('잘못된 접근입니다.');
    throw error;
  }

  const restart = async () => {
    await requestDeleteProgress(studyId, progressId);
    setNickname('');
    return;
  };

  const checkProgresses = useCallback(async () => {
    if (isHost || !memberInfo) {
      return setNickname('');
    }

    try {
      const { data } = await requestGetCheckProgresses(studyId, memberInfo.memberId);
      setNickname(data.progresses[0].nickname);
      setProgressId(data.progresses[0].progressId);
    } catch (reason) {
      if (reason instanceof ApiError && reason.code === 1201) {
        return setNickname('');
      }
      throw reason;
    }
  }, [studyId, isHost, memberInfo]);

  useEffect(() => {
    checkProgresses();
  }, [checkProgresses, isHost, memberInfo]);

  return { studyId, nickname, restart };
};

export default useCheckProgresses;
