/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

type Status = 'pending' | 'fulfilled' | 'error';

type Options = {
  suspense?: boolean;
};

const useFetch = <T>(request: () => Promise<T>, { suspense = true }: Options = {}) => {
  const [promise, setPromise] = useState<Promise<void>>();
  const [status, setStatus] = useState<Status>('pending');
  const [result, setResult] = useState<T>();
  const [error, setError] = useState<Error>();

  const resolvePromise = useCallback((result: T) => {
    setStatus('fulfilled');
    setResult(result);
  }, []);

  const rejectPromise = useCallback((error: Error) => {
    setStatus('error');
    setError(error);
  }, []);

  useEffect(() => {
    setStatus('pending');
    setPromise(request().then(resolvePromise, rejectPromise));
  }, []);

  if (suspense && status === 'pending' && promise) {
    throw promise;
  }
  if (status === 'error') {
    throw error;
  }

  return { result, isLoading: status === 'pending', error: error };
};

export default useFetch;
