/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import useTimer from '@Hooks/common/useTimer';

import type { Step } from '@Types/study';

const INIT_SECONDS = 600;
const SECONDS_PER_MINUTE = 60;

type Params = {
  studyMinutes: number;
  step: Step;
  lastModifiedDate: string;

  onStart?: () => void;
  onStop?: () => void;
  onComplete?: () => void;
};

const useStepTimer = ({ studyMinutes, step, lastModifiedDate, onStart, onStop, onComplete }: Params) => {
  const { start, stop, reset, leftSeconds, isTicking } = useTimer(INIT_SECONDS, { onStart, onStop, onComplete });

  useEffect(() => {
    const passedTime = Math.floor((Date.now() - new Date(lastModifiedDate).getTime()) / 1000);

    if (step === 'planning' || step === 'retrospect') {
      reset(INIT_SECONDS - passedTime);
    } else {
      reset(studyMinutes * SECONDS_PER_MINUTE - passedTime);
    }

    start();
  }, [studyMinutes, step]);

  return {
    start,
    stop,
    leftSeconds,
    isTicking,
  };
};

export default useStepTimer;
