/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import cacheStorage from '@Utils/CacheStorage';

import useMutation from './useMutation';

type Options<T> = {
  cacheKey: string[];
  cacheTime?: number;
  errorBoundary?: boolean;
  enabled: boolean;
  onSuccess?: (result: T) => void | Promise<void>;
  onError?: (error: Error) => void;
};

const useCacheFetch = <T>(
  request: () => Promise<T>,
  { errorBoundary = true, cacheKey, cacheTime, onSuccess, onError, enabled }: Options<T>,
) => {
  const [isLoading, setIsLoading] = useState(true);

  const [result, setResult] = useState<T | null>(null);
  const { mutate, error } = useMutation(request, {
    errorBoundary,
    onSuccess,
    onError,
  });

  const cacheFetch = async () => {
    const cacheData = cacheStorage.find<T>(cacheKey);

    if (cacheData) {
      await onSuccess?.(cacheData);
      setResult(cacheData);

      setIsLoading(false);

      return;
    }

    setIsLoading(true);

    const result = await mutate();

    await onSuccess?.(result);
    setResult(result);

    cacheStorage.add<T>(cacheKey || [], result, cacheTime);
    setIsLoading(false);
  };

  useEffect(() => {
    if (enabled) cacheFetch();
  }, []);

  return { cacheFetch, result, isLoading, error };
};

export default useCacheFetch;
