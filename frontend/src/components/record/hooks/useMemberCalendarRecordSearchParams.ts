import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useMemberCalendarRecordSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [urlParams, setUrlParams] = useState({
    urlYear: searchParams.get('year'),
    urlMonth: searchParams.get('month'),
  });

  const updateUrlMonth = (type: 'next' | 'prev' | 'today') => {
    let newUrlYear: string | null = null;
    let newUrlMonth: string | null = null;

    if (type === 'today') {
      const today = new Date();
      const currentYear = String(today.getFullYear());
      const currentMonth = String(today.getMonth() + 1);

      newUrlYear = currentYear;
      newUrlMonth = currentMonth;
    }

    const updatedMonth = Number(urlParams.urlMonth) + (type === 'next' ? +1 : -1);

    if (updatedMonth === 0) {
      newUrlYear = String(Number(urlParams.urlYear) - 1);
      newUrlMonth = '12';
    }

    if (updatedMonth === 13) {
      newUrlYear = String(Number(urlParams.urlYear) + 1);
      newUrlMonth = '1';
    }

    if (updatedMonth < 13 && updatedMonth > 1) {
      newUrlYear = urlParams.urlYear || '2023';
      newUrlMonth = String(updatedMonth);
    }

    setUrlParams({ urlYear: newUrlYear!, urlMonth: newUrlMonth! });
  };

  const updateUrlDate = (year: number, month: number) => {
    setUrlParams({ urlYear: String(year), urlMonth: String(month) });
  };

  useEffect(() => {
    const { urlMonth, urlYear } = urlParams;

    if (!urlMonth || !urlYear) return;

    setSearchParams({
      year: urlYear,
      month: urlMonth,
    });
  }, [setSearchParams, urlParams]);

  return {
    urlDate: new Date(Number(urlParams.urlYear), Number(urlParams.urlMonth) - 1),
    updateUrlMonth,
    updateUrlDate,
  };
};

export default useMemberCalendarRecordSearchParams;
