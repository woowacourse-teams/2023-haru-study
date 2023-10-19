/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';

type Status = 'pending' | 'fulfilled' | 'error';

type Options<T> = {
  enabled?: boolean;
  suspense?: boolean;
  errorBoundary?: boolean;
  refetchInterval?: number;

  onSuccess?: (result: T) => void;
  onError?: (error: Error) => void;
};

const useFetch = <T>(
  request: () => Promise<T>,
  { enabled = true, suspense = true, errorBoundary = true, refetchInterval, onSuccess, onError }: Options<T> = {},
) => {
  const [status, setStatus] = useState<Status>('pending');
  const [promise, setPromise] = useState<Promise<void> | null>(null);
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const interval = useRef<NodeJS.Timer | null>(null);

  const resolvePromise = useCallback(
    (newResult: T) => {
      setStatus('fulfilled');
      setResult(newResult);
      onSuccess?.(newResult);
    },
    [onSuccess],
  );

  const rejectPromise = useCallback(
    (error: Error) => {
      setStatus('error');
      setError(error);
      onError?.(error);
    },
    [onError],
  );

  const fetch = useCallback(() => {
    setStatus('pending');

    const requestPromise = request().then(resolvePromise, rejectPromise);
    setPromise(requestPromise);

    return requestPromise;
  }, []);

  const clearResult = () => setResult(null);

  const clearIntervalRef = () => {
    if (interval.current === null) return;
    clearInterval(interval.current);
    interval.current = null;
  };

  useEffect(() => {
    if (!enabled) return;

    fetch();

    if (refetchInterval) {
      interval.current = setInterval(fetch, refetchInterval);
      return clearIntervalRef;
    }
  }, [enabled, fetch]);

  if (suspense && status === 'pending' && promise) {
    throw promise;
  }
  if (errorBoundary && status === 'error') {
    throw error;
  }

  return { result, isLoading: status === 'pending', error: error, clearResult, refetch: fetch };
};

export default useFetch;
