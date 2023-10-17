import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

const useFetch = <T>(url: string) => {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<T | null>(null);

  const changePage = (page: number) => {
    setPage(page);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/admin/${url}/?size=10&page=${page - 1}`)
      .then((response) => response.json())
      .then((result: T) => setResult(result))
      .catch((error: Error) => {
        console.error(error);
        navigate(`${ROUTES_PATH.login}`);
      });
  }, [url, page, navigate]);

  return { page, result, changePage };
};

export default useFetch;
