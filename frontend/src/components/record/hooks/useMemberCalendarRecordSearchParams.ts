import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const useMemberCalendarRecordSearchParams = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const urlYear = searchParams.get('year');
  const urlMonth = searchParams.get('month');

  const urlDate = new Date(Number(urlYear), Number(urlMonth) - 1);

  const updateUrlMonth = (type: 'next' | 'prev' | 'today') => {
    if (type === 'today') {
      const today = new Date();
      const year = String(today.getFullYear());
      const month = String(today.getMonth() + 1);

      setSearchParams({ year, month });

      return;
    }

    const updatedMonth = Number(urlMonth) + (type === 'next' ? +1 : -1);

    if (updatedMonth === 0) {
      setSearchParams({ year: String(Number(urlYear) - 1), month: '12' });

      return;
    }

    if (updatedMonth === 13) {
      setSearchParams({ year: String(Number(urlYear) + 1), month: '1' });

      return;
    }

    setSearchParams({ year: urlYear || '2023', month: String(updatedMonth) });
  };

  const updateUrlDate = (year: number, month: number) => {
    setSearchParams({ year: String(year), month: String(month) });
  };

  useEffect(() => {
    if (!urlYear || !urlMonth) {
      navigate('/404');
    }
  }, [urlYear, urlMonth, navigate]);

  return { urlDate, updateUrlMonth, updateUrlDate };
};

export default useMemberCalendarRecordSearchParams;
