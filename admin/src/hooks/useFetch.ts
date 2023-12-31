import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

const useFetch = <T>(url: string, queryOption?: string) => {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<T | null>(null);

  const changePage = (page: number) => {
    setPage(page);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/admin/${url}?size=10&page=${page - 1}${queryOption ? '&' + queryOption : ''}`)
      .then((response) => {
        if (!response.ok) {
          return navigate(`${ROUTES_PATH.login}`);
        }

        return response.json();
      })
      .then((result: T) => setResult(result))
      .catch((error: Error) => {
        console.error(error);
        navigate(`${ROUTES_PATH.login}`);
      });
  }, [url, page, navigate, queryOption]);

  return { page, result, changePage };
};

export default useFetch;
