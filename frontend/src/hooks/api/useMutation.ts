import { useState } from 'react';

import useErrorBoundary from '@Hooks/common/useErrorBoundary';

import { ApiError, UnknownApiError } from '@Errors/index';

const useMutation = <T>(request: () => Promise<T>, onSuccess?: () => void, onError?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setError } = useErrorBoundary();

  const mutate = async () => {
    try {
      setIsLoading(true);
      const data = await request();

      onSuccess?.();

      return data;
    } catch (reason) {
      onError?.();
      if (reason instanceof ApiError || reason instanceof UnknownApiError) {
        setError?.(reason);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
};

export default useMutation;
