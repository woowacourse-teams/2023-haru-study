import { useState } from 'react';

import { NickNameExist } from '@Components/participation/ParticipationInfo/ParticipationInfo';

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

  const checkParticipantCode = async (
    participationCode: string | null,
    memberId: string | null,
    setNickNameExistence: React.Dispatch<React.SetStateAction<NickNameExist>>,
  ) => {
    const response = await authenticateParticipantCode(participationCode ?? '', memberId ? Number(memberId) : null);

    const result = (await response.json()) as StudyInfo;

    setStudyName(result.studyName);
    setCookie('studyId', result.studyId.toString(), 1);

    if (!result.nickName) {
      return setNickNameExistence('notExist');
    }

    setResponseNickName(result.nickName);
  };

  return { responseNickName, studyName, checkParticipantCode };
};

export default useParticipantCode;
