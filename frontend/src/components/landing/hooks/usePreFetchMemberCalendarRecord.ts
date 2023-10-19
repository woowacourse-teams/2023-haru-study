import usePreFetch from '@Hooks/api/usePreFetch';

import calendar from '@Utils/calendar';
import format from '@Utils/format';

import { requestGetMemberCalendarRecord } from '@Apis/index';

const usePreFetchMemberCalendarRecord = (memberId: string | undefined) => {
  const { prefetch } = usePreFetch();

  if (!memberId) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const [startDate, endDate] = calendar.getMonthFirstLastDate(year, month).map((date) => {
    if (!date) return '';

    return format.date(date.date, '-');
  });

  prefetch(() => requestGetMemberCalendarRecord(memberId, startDate, endDate), {
    cacheKey: [startDate, endDate],
    cacheTime: 60 * 1000,
  });
};

export default usePreFetchMemberCalendarRecord;
