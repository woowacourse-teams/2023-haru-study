import { useEffect, useRef, useState } from 'react';

const SECONDS_PER_MINUTE = 60;

const useTimer = (minutes: number) => {
  const timerId = useRef<NodeJS.Timer | null>(null);
  const seconds = minutes * SECONDS_PER_MINUTE;

  const [leftTime, setLeftTime] = useState(seconds);
  const [isTicking, setIsTicking] = useState(false);

  const clear = () => {
    if (timerId.current === null) return;

    clearInterval(timerId.current);
    timerId.current = null;
  };

  const tick = () => {
    if (leftTime > 0) {
      setLeftTime(leftTime - 1);
    }
    if (leftTime <= 1) {
      setIsTicking(false);
      clear();
    }
  };

  useEffect(() => {
    if (isTicking) {
      timerId.current = setInterval(tick, 1000);
    }

    return clear;
  }, [tick, isTicking]);

  useEffect(() => {
    const seconds = minutes * SECONDS_PER_MINUTE;

    setLeftTime(seconds);
    setIsTicking(false);
  }, [minutes]);

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
