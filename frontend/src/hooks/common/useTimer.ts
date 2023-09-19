import { useCallback, useEffect, useRef, useState } from 'react';

const useTimer = (initSeconds: number) => {
  const timerId = useRef<NodeJS.Timer | null>(null);
  const startTime = useRef(Date.now());
  const seconds = useRef(initSeconds);

  const [leftSeconds, setLeftSeconds] = useState(seconds.current);
  const [isTicking, setIsTicking] = useState(false);

  const clear = () => {
    if (timerId.current === null) return;

    clearInterval(timerId.current);
    timerId.current = null;
  };

  const tick = useCallback(() => {
    if (leftSeconds > 0) {
      const timeDifference = Math.floor((Date.now() - startTime.current) / 1000);
      const leftSeconds = seconds.current - timeDifference;

      setLeftSeconds(leftSeconds > 0 ? leftSeconds : 0);
    }
    if (leftSeconds <= 1) {
      setIsTicking(false);
      clear();
    }
  }, [leftSeconds]);

  useEffect(() => {
    if (isTicking) {
      timerId.current = setInterval(tick, 1000);
    }

    return clear;
  }, [tick, isTicking]);

  const start = useCallback(() => {
    startTime.current = Date.now();
    setIsTicking(true);
  }, []);

  const stop = useCallback(() => {
    seconds.current = leftSeconds;
    setIsTicking(false);
  }, [leftSeconds]);

  const reset = useCallback((newSeconds?: number) => {
    if (newSeconds) {
      seconds.current = newSeconds;
    }

    setIsTicking(false);
    setLeftSeconds(seconds.current);
  }, []);

  return {
    start,
    stop,
    reset,
    leftSeconds,
    isTicking,
  };
};

export default useTimer;
