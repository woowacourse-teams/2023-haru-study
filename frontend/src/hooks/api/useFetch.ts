/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

type Status = 'pending' | 'fulfilled' | 'error';

type Options<T> = {
  enabled?: boolean;
  suspense?: boolean;
  errorBoundary?: boolean;

  onSuccess?: (result: T) => void;
  onError?: (error: Error) => void;
};

const useFetch = <T>(
  request: () => Promise<T>,
  { enabled = true, suspense = true, errorBoundary = true, onSuccess, onError }: Options<T> = {},
) => {
  const [status, setStatus] = useState<Status>('pending');
  const [promise, setPromise] = useState<Promise<void> | null>(null);
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const resolvePromise = useCallback(
    (result: T) => {
      setStatus('fulfilled');
      setResult(result);
      onSuccess?.(result);
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
    setPromise(request().then(resolvePromise, rejectPromise));
  }, []);

  const clearResult = () => setResult(null);

  useEffect(() => {
    if (enabled) {
      fetch();
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
