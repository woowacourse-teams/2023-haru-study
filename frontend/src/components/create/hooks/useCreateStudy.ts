import { useNavigate } from 'react-router-dom';

import useMutation from '@Hooks/api/useMutation';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';
import { useNotification } from '@Contexts/NotificationProvider';

import { requestPostCreateStudy, requestPostNextStep, requestPostRegisterParticipants } from '@Apis/index';

import type { StudyMode, StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

type CreateStudyResult = {
  studyId: string;
};

const useCreateStudy = (
  studyName: string,
  totalCycle: TotalCycleOptions | null,
  timePerCycle: StudyTimePerCycleOptions | null,
  studyMode: StudyMode,
) => {
  const memberInfo = useMemberInfo();
  const navigate = useNavigate();
  const { send } = useNotification();

  const { mutate: createStudy, isLoading } = useMutation<CreateStudyResult>(
    () => requestPostCreateStudy(studyName, totalCycle, timePerCycle),
    {
      onSuccess: async (result) => {
        if (studyMode === 'group') {
          return navigate(`${ROUTES_PATH.preparation}/${result.studyId}`, {
            state: { studyName },
          });
        }

        if (studyMode === 'alone') {
          const nickname = memberInfo!.name.substring(0, 10);
          await requestPostRegisterParticipants(nickname, result.studyId, memberInfo!.memberId);
          await requestPostNextStep(result.studyId);

          send({ message: '스터디가 시작되었습니다.' });

          return navigate(`${ROUTES_PATH.progress}/${result.studyId}`);
        }
      },
    },
  );

  return { createStudy, isLoading };
};

export default useCreateStudy;
