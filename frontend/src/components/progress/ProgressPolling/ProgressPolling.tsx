/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import useFetch from '@Hooks/api/useFetch';

import { useParticipantInfo, useStudyInfo, useStudyProgressAction } from '@Contexts/StudyProgressProvider';

import { requestGetCurrentStep } from '@Apis/index';

const ProgressPolling = () => {
  const { isHost } = useParticipantInfo();
  const { studyId, progressStep } = useStudyInfo();
  const { updateStudyInfo } = useStudyProgressAction();

  const { result: fetchedProgressStep } = useFetch(
    async () => {
      const { data } = await requestGetCurrentStep(studyId);

      return data.progressStep;
    },
    {
      refetchInterval: 3000,
      enabled: !isHost,
      suspense: false,
    },
  );

  useEffect(() => {
    if (!fetchedProgressStep) return;

    if (progressStep !== fetchedProgressStep) {
      updateStudyInfo();
    }
  }, [fetchedProgressStep]);

  return null;
};

export default ProgressPolling;
