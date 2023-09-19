import { useEffect } from 'react';

import useTimer from '@Hooks/common/useTImer';

import type { Step } from '@Types/study';

const INIT_SECONDS = 600;
const SECONDS_PER_MINUTE = 60;

const useStepTimer = (studyMinutes: number, step: Step) => {
  const { start, stop, reset, leftSeconds, isTicking } = useTimer(INIT_SECONDS);

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
