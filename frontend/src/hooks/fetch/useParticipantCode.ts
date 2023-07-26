import { useState } from 'react';

import { setCookie } from '@Utils/cookie';

import { authenticateParticipantCode } from '@Apis/index';

type StudyInfo = {
  studyId: number;
  studyName: string;
  nickName: string | null;
};

const useParticipantCode = () => {
  const [responseNickName, setResponseNickName] = useState<StudyInfo['nickName']>(null);
  const [studyName, setStudyName] = useState<StudyInfo['studyName']>('');

  const checkParticipantCode = async (participationCode: string | null, memberId: string | null) => {
    const response = await authenticateParticipantCode(participationCode ?? '', memberId ? Number(memberId) : null);

    const result = (await response.json()) as StudyInfo;

    setData(result);

    if (!result.nickName) {
      return false;
    }

    return true;
  };

  const setData = (result: StudyInfo) => {
    setStudyName(result.studyName);
    setCookie('studyId', result.studyId.toString(), 1);
    setResponseNickName(result.nickName);
  };

  return { responseNickName, studyName, checkParticipantCode };
};

export default useParticipantCode;
