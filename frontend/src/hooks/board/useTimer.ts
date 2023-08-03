import { useCallback, useEffect, useRef, useState } from 'react';

import type { Step } from '@Types/study';

const PLANNING_MINUTES = 10;
const SECONDS_PER_MINUTE = 60;

const useTimer = (studyMinutes: number, step: Step) => {
  const timerId = useRef<NodeJS.Timer | null>(null);
  const startTime = useRef(Date.now());
  const initTime = useRef(PLANNING_MINUTES * SECONDS_PER_MINUTE);

  const [leftTime, setLeftTime] = useState(initTime.current);
  const [isTicking, setIsTicking] = useState(false);

  const clear = () => {
    if (timerId.current === null) return;

    clearInterval(timerId.current);
    timerId.current = null;
  };

  const tick = useCallback(() => {
    if (leftTime > 0) {
      const timeDifference = Math.floor((Date.now() - startTime.current) / 1000);

      setLeftTime(initTime.current - timeDifference);
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
      initTime.current = PLANNING_MINUTES * SECONDS_PER_MINUTE;
      setLeftTime(PLANNING_MINUTES * SECONDS_PER_MINUTE);
      return;
    }

    initTime.current = studyMinutes * SECONDS_PER_MINUTE;
    setLeftTime(studyMinutes * SECONDS_PER_MINUTE);
  }, [studyMinutes, step]);

  const start = () => {
    startTime.current = Date.now();
    setIsTicking(true);
  };

  const stop = () => {
    initTime.current = leftTime;
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
