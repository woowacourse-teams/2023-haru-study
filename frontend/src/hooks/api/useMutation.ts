import { useEffect, useState } from 'react';

type Options = {
  errorBoundary?: boolean;

  onSuccess?: <T>(result: T) => void;
  onError?: (error: Error) => void;
};

const useMutation = <T>(request: () => Promise<T>, { errorBoundary = true, onSuccess, onError }: Options = {}) => {
  const [result, setResult] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const mutate = async () => {
    setIsLoading(true);

    try {
      const result = await request();
      setResult(result);
      onSuccess?.(result);
      return result;
    } catch (reason) {
      if (!(reason instanceof Error)) throw reason;
      setError(reason);
      onError?.(reason);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errorBoundary && error) {
      throw error;
    }
  }, [error, errorBoundary]);

  return { mutate, result, isLoading, error };
};

export default useMutation;
