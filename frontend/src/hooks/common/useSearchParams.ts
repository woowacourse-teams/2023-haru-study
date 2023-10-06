/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSearchParams = <T>() => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  const initSearchParams: Record<string, string> = {};
  params.forEach((value, key) => {
    initSearchParams[key] = value;
  });

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState<Record<string, string>>(initSearchParams);
  const [updateTrigger, setUpdateTrigger] = useState(1);

  const updateSearchParams = (args: Partial<Record<keyof T, string | null>>) => {
    Object.entries(args).forEach(([key, value]) => {
      if (!value)
        setSearchParams((prev) => {
          delete prev[key];
          return prev;
        });
      if (typeof value === 'string') {
        setSearchParams((prev) => {
          return {
            ...prev,
            [key]: value,
          };
        });
      }
    });

    setUpdateTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    if (updateTrigger === 1) return;

    const queryString = Object.entries(searchParams).reduce((acc, cur, index) => {
      return acc + `${index === 0 ? '?' : '&'}${cur.join('=')}`;
    }, '');

    navigate(queryString);
  }, [updateTrigger]);

  return { searchParams: searchParams as T, updateSearchParams };
};

export default useSearchParams;
