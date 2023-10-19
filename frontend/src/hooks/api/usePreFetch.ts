import cacheStorage from '@Utils/CacheStorage';

type Options = {
  cacheKey: string[];
  cacheTime?: number;
};

const usePreFetch = () => {
  const prefetch = async <T>(request: () => Promise<T>, { cacheKey, cacheTime }: Options) => {
    const cacheData = cacheStorage.find<T>(cacheKey);

    if (cacheData) return;

    const result = await request();

    cacheStorage.add<T>(cacheKey || [], result, cacheTime);
  };

  return { prefetch };
};

export default usePreFetch;
