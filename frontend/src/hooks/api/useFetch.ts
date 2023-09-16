/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

type Status = 'pending' | 'fulfilled' | 'error';

type Options = {
  suspense?: boolean;
  enabled?: boolean;

  onSuccess?: <T>(result: T) => void;
  onError?: (error: Error) => void;
};

const useFetch = <T>(
  request: () => Promise<T>,
  { suspense = true, enabled = true, onSuccess, onError }: Options = {},
) => {
  const [promise, setPromise] = useState<Promise<void> | null>(null);
  const [status, setStatus] = useState<Status>('pending');
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<Error>();

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
  }, [rejectPromise, resolvePromise]);

  useEffect(() => {
    if (enabled) {
      fetch();
    }
  }, [enabled, fetch]);

  const clearResult = () => setResult(null);

  if (suspense && status === 'pending' && promise) {
    throw promise;
  }
  if (status === 'error') {
    throw error;
  }

  return { result, isLoading: status === 'pending', error: error, clearResult, refetch: fetch };
};

export default useFetch;
