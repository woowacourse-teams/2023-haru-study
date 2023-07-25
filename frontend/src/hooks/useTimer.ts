import { useCallback, useEffect, useRef, useState } from 'react';

import type { Step } from '@Constants/study';

const PLANNING_MINUTES = 10;
const SECONDS_PER_MINUTE = 60;

const useTimer = (studyMinutes: number, step: Step) => {
  const timerId = useRef<NodeJS.Timer | null>(null);

  const initialMinutes = PLANNING_MINUTES * SECONDS_PER_MINUTE;
  const [leftTime, setLeftTime] = useState(initialMinutes);
  const [isTicking, setIsTicking] = useState(false);

  const clear = () => {
    if (timerId.current === null) return;

    clearInterval(timerId.current);
    timerId.current = null;
  };

  const tick = useCallback(() => {
    if (leftTime > 0) {
      setLeftTime(leftTime - 1);
    }
    if (leftTime <= 1) {
      setIsTicking(false);
      clear();
    }
  }, [leftTime]);

  useEffect(() => {
    if (isTicking) {
      timerId.current = setInterval(tick, 1000);
    }

    return clear;
  }, [tick, isTicking]);

  useEffect(() => {
    setIsTicking(false);

    if (step === 'planning' || step === 'retrospect') {
      setLeftTime(PLANNING_MINUTES * SECONDS_PER_MINUTE);
      return;
    }

    setLeftTime(studyMinutes * SECONDS_PER_MINUTE);
  }, [studyMinutes, step]);

  const start = () => {
    setIsTicking(true);
  };

  const stop = () => {
    setIsTicking(false);
  };

  const getFormattedTime = () => {
    const minutes = Math.floor(leftTime / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(leftTime % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  return {
    start,
    stop,
    getFormattedTime,
    leftTime,
    isTicking,
  };
};

export default useTimer;
