import { useCallback, useEffect, useState } from 'react';

const useFetch = <T extends object>(url: string, config: RequestInit = {}) => {
  const [status, setStatus] = useState<'pending' | 'fulfilled' | 'rejected'>('pending');
  const [data, setData] = useState<T>();

  const fetchData = useCallback(async () => {
    const response = await fetch(url, config);
    const data = (await response.json()) as T;

    setStatus('fulfilled');
    setData(data);
  }, [url, config]);

  useEffect(() => {
    fetchData();
  }, []);

  return { data, status };
};

export default useFetch;
