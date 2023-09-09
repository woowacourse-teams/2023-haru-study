import { useCallback, useEffect, useState } from 'react';

import type { ApiError, UnknownApiError } from '@Errors/index';

const useFetch = <T>(
  request: () => Promise<T>,
  onSuccess?: () => void,
  onError?: (reason: ApiError | UnknownApiError | Error) => void,
) => {
  const [promise, setPromise] = useState<Promise<void>>();
  const [status, setStatus] = useState<'pending' | 'fulfilled' | 'error'>('pending');
  const [result, setResult] = useState<T>();
  const [error, setError] = useState<ApiError | UnknownApiError | Error>();

  const resolvePromise = useCallback(
    (result: T) => {
      setStatus('fulfilled');
      setResult(result);
      onSuccess?.();
    },
    [onSuccess],
  );

  const rejectPromise = useCallback(
    (reason: ApiError | UnknownApiError | Error) => {
      setStatus('error');
      setError(reason);
      onError?.(reason);
    },
    [onError],
  );

  const handlePromise = useCallback(() => {
    setStatus('pending');
    setPromise(request().then(resolvePromise, rejectPromise));
  }, [request, rejectPromise, resolvePromise]);

  useEffect(() => {
    handlePromise();
  }, []);

  if (status === 'pending' && promise) throw promise;

  if (status === 'error') throw error;

  return result;
};

export default useFetch;
