import { useEffect } from 'react';

import useTimer from '@Hooks/common/useTimer';

import type { Step } from '@Types/study';

const INIT_SECONDS = 600;
const SECONDS_PER_MINUTE = 60;

type Params = {
  studyMinutes: number;
  step: Step;
  onStart?: () => void;
  onStop?: () => void;
  onComplete?: () => void;
};

const useStepTimer = ({ studyMinutes, step, onStart, onStop, onComplete }: Params) => {
  const { start, stop, reset, leftSeconds, isTicking } = useTimer(INIT_SECONDS, { onStart, onStop, onComplete });

  useEffect(() => {
    if (step === 'planning' || step === 'retrospect') {
      reset(INIT_SECONDS);
    } else {
      reset(studyMinutes * SECONDS_PER_MINUTE);
    }

    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyMinutes, step]);

  return {
    start,
    stop,
    leftSeconds,
    isTicking,
  };
};

export default useStepTimer;
