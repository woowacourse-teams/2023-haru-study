/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';

import cacheStorage from '@Utils/CacheStorage';

import useMutation from './useMutation';

type Options<T> = {
  queryKey: string[];
  cacheTime?: number;
  errorBoundary?: boolean;
  onSuccess?: (result: T) => void | Promise<void>;
  onError?: (error: Error) => void;
};

const useCacheMutation = <T>(
  request: () => Promise<T>,
  { errorBoundary = true, queryKey, cacheTime, onSuccess, onError }: Options<T>,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<T | null>(null);
  const { mutate, error } = useMutation(request, {
    errorBoundary,
    onSuccess,
    onError,
  });

  const cacheData = cacheStorage.find<T>(queryKey);

  const cacheMutate = async () => {
    setIsLoading(true);

    if (cacheData) {
      await onSuccess?.(cacheData);
      setResult(cacheData);

      setIsLoading(false);
      updateCacheData();

      return;
    }

    const result = await mutate();

    await onSuccess?.(result);
    setResult(result);

    cacheStorage.add<T>(queryKey || [], result, cacheTime);
    setIsLoading(false);
  };

  const updateCacheData = async () => {
    const result = await request();

    await onSuccess?.(result);
    setResult(result);

    cacheStorage.add<T>(queryKey || [], result, cacheTime);
  };

  return { mutate: cacheMutate, result, isLoading, error };
};

export default useCacheMutation;
