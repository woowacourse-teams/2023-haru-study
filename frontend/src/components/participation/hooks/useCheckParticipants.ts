import { useState } from 'react';
import { useParams } from 'react-router-dom';

import useFetch from '@Hooks/api/useFetch';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { requestGetCheckParticipants } from '@Apis/index';

import type { ResponseCheckParticipants } from '@Types/api';

const useCheckParticipants = () => {
  const { studyId } = useParams();

  const memberInfo = useMemberInfo();

  const { result } = useFetch<ResponseCheckParticipants>(() =>
    requestGetCheckParticipants(studyId ?? '', memberInfo?.memberId ?? ''),
  );

  const [isRegisterShow, setRegisterShow] = useState(false);

  const handleShowMemberRegister = () => {
    setRegisterShow(true);
  };

  const isShownMemeberRestart = result?.participants?.[0].nickname && !isRegisterShow;

  if (!studyId) throw new Error('잘못된 접근입니다.');

  return {
    studyId,
    participantsResult: result,
    nickname: result?.participants?.[0].nickname,
    participantId: result?.participants?.[0].participantId,
    handleShowMemberRegister,
    isShownMemeberRestart,
  };
};

export default useCheckParticipants;
