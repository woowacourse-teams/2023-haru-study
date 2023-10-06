import useSearchParams from '@Hooks/common/useSearchParams';

const useMemberCalendarRecordSearchParams = () => {
  const { searchParams, updateSearchParams } = useSearchParams<{
    year: string;
    month: string;
  }>();

  const urlDate =
    searchParams.year && searchParams.month
      ? new Date(Number(searchParams.year), Number(searchParams.month) - 1)
      : new Date();

  const updateMonth = (type: 'next' | 'prev' | 'today') => {
    let newYear: string | null = null;
    let newMonth: string | null = null;

    const today = new Date();
    const currentYear = String(today.getFullYear());
    const currentMonth = String(today.getMonth() + 1);

    const updatedMonth = Number(searchParams.month) + (type === 'next' ? +1 : -1);

    if (updatedMonth === 0) {
      newYear = String(Number(searchParams.year) - 1);
      newMonth = '12';
    }

    if (updatedMonth === 13) {
      newYear = String(Number(searchParams.year) + 1);
      newMonth = '1';
    }

    if (updatedMonth < 13 && updatedMonth > 0) {
      newYear = searchParams.year || currentYear;
      newMonth = String(updatedMonth);
    }

    if (type === 'today') {
      newYear = currentYear;
      newMonth = currentMonth;
    }

    updateSearchParams({
      year: newYear,
      month: newMonth,
    });
  };

  const updateDate = (year: number, month: number) => {
    updateSearchParams({
      year: String(year),
      month: String(month),
    });
  };

  return {
    urlDate,
    updateMonth,
    updateDate,
  };
};

export default useMemberCalendarRecordSearchParams;
