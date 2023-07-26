import { setCookie } from '@Utils/cookie';

import { startStudy } from '@Apis/index';

const useParticipateStudy = () => {
  const participateStudy = async (studyId: string | null, nickName: string | null) => {
    const response = await startStudy(nickName, studyId);

    const locationHeader = response.headers.get('Location');
    const memberId = locationHeader?.split('/').pop() as string;

    setCookie('memberId', memberId, 1);
  };

  return { participateStudy };
};

export default useParticipateStudy;
