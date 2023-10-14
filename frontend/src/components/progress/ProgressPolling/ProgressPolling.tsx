/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import useFetch from '@Hooks/api/useFetch';

import { useParticipantInfo, useStudyInfo, useStudyProgressAction } from '@Contexts/StudyProgressProvider';

import { requestGetCurrentStep } from '@Apis/index';

const ProgressPolling = () => {
  const { isHost } = useParticipantInfo();
  const { studyId, progressStep } = useStudyInfo();
  const { updateStudyInfo } = useStudyProgressAction();

  const { result } = useFetch(() => requestGetCurrentStep(studyId), {
    refetchInterval: 3000,
    enabled: !isHost,
    suspense: false,
  });

  useEffect(() => {
    if (!result) return;

    if (progressStep !== result.data.progressStep) {
      updateStudyInfo();
    }
  }, [result]);

  return null;
};

export default ProgressPolling;
