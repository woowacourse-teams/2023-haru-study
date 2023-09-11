import { useCallback, useEffect, useState } from 'react';

type Status = 'pending' | 'fulfilled' | 'error';

const useFetch = <T>(request: () => Promise<T>) => {
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
  }, [request, resolvePromise, rejectPromise]);

  if (status === 'pending' && promise) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw promise;
  }
  if (status === 'error') {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error;
  }

  return result;
};

export default useFetch;
