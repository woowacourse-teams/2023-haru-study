import { useNavigate } from 'react-router-dom';

import useMutation from '@Hooks/api/useMutation';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { requestPostCreateStudy, requestPostRegisterParticipants } from '@Apis/index';

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

  const { mutate: createStudy, isLoading } = useMutation<CreateStudyResult>(
    () => requestPostCreateStudy(studyName, totalCycle, timePerCycle),
    {
      onSuccess: async (result) => {
        if (studyMode === 'together') {
          return navigate(`${ROUTES_PATH.preparation}/${result.studyId}`, {
            state: { studyName },
          });
        }

        const nickname = memberInfo!.name.substring(0, 10);
        await requestPostRegisterParticipants(nickname, result.studyId, memberInfo!.memberId);

        return navigate(`${ROUTES_PATH.progress}/${result.studyId}`);
      },
    },
  );

  return { createStudy, isLoading };
};

export default useCreateStudy;
