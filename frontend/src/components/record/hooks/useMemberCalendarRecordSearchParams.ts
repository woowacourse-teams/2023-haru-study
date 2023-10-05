import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const useMemberCalendarRecordSearchParams = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const searchYear = searchParams.get('year');
  const searchMonth = searchParams.get('month');

  const searchDate = new Date(Number(searchYear), Number(searchMonth) - 1);

  const updateSearchMonth = (type: 'next' | 'prev' | 'today') => {
    if (type === 'today') {
      const today = new Date();
      const year = String(today.getFullYear());
      const month = String(today.getMonth() + 1);

      setSearchParams({ year, month });

      return;
    }

    const updatedMonth = Number(searchMonth) + (type === 'next' ? +1 : -1);

    if (updatedMonth === 0) {
      setSearchParams({ year: String(Number(searchYear) - 1), month: '12' });

      return;
    }

    if (updatedMonth === 13) {
      setSearchParams({ year: String(Number(searchYear) + 1), month: '1' });

      return;
    }

    setSearchParams({ year: searchYear || '2023', month: String(updatedMonth) });
  };

  const updateSearchDate = (year: number, month: number) => {
    setSearchParams({ year: String(year), month: String(month) });
  };

  useEffect(() => {
    if (!searchYear || !searchMonth) {
      navigate('/404');
    }
  }, [searchYear, searchMonth, navigate]);

  return { searchDate, updateSearchMonth, updateSearchDate };
};

export default useMemberCalendarRecordSearchParams;
