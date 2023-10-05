import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { PERIOD } from '@Constants/record';

import format from '@Utils/format';

export type Period = keyof typeof PERIOD;

export type MemberRecordPeriodContextType = {
  period: Period;
  startDate: string | null;
  endDate: string | null;
  page: number;
  hasSelectedCustomPeriod: boolean;
  triggerSearchRecord: number;
  isMiddleSelectedCustomDate: (date: Date) => boolean;
  updateUrlPeriod: (period: Period) => void;
  updateUrlStartEndDate: (date: Date) => void;
  updateHoverDays: (date: Date) => void;
  updateUrlPage: (page: number) => void;
};

const MemberRecordPeriodContext = createContext<MemberRecordPeriodContextType | null>(null);

const MemberRecordPeriodProvider = ({ children }: PropsWithChildren) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [urlParams, setUrlParams] = useState({
    urlPeriod: searchParams.get('period') as Period,
    urlPage: Number(searchParams.get('page')),
    urlStartDate: searchParams.get('start'),
    urlEndDate: searchParams.get('end'),
  });

  const [triggerSearchRecord, setTriggerSearchRecord] = useState(0);
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

  const updateUrlPeriod = (period: Period) => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();

    let newStartDate: null | string = null;
    let newEndDate: null | string = format.date(today, '-');

    if (period === 'entire') newEndDate = null;

    if (period === 'week') newStartDate = format.date(new Date(today.setDate(day - 7)), '-');

    if (period === 'oneMonth') newStartDate = format.date(new Date(today.setMonth(month - 1)), '-');

    if (period === 'threeMonth') newStartDate = format.date(new Date(today.setMonth(month - 3)), '-');

    if (period === 'custom') {
      newStartDate = urlParams.urlStartDate;
      newEndDate = urlParams.urlEndDate;
    }

    setUrlParams({
      urlPeriod: period,
      urlPage: 1,
      urlStartDate: newStartDate,
      urlEndDate: newEndDate,
    });

    setTriggerSearchRecord((prev) => prev + 1);
  };

  const updateUrlPage = (page: number) => {
    setUrlParams((prev) => {
      return {
        ...prev,
        urlPage: page,
      };
    });

    setTriggerSearchRecord((prev) => prev + 1);
  };

  const updateUrlStartEndDate = (date: Date) => {
    setHoveredDay(date);

    const { urlStartDate, urlEndDate } = urlParams;

    let newStartDate: null | string = null;
    let newEndDate: null | string = null;

    if (!urlStartDate) newStartDate = format.date(new Date(date), '-');

    if (urlStartDate && !urlEndDate && new Date(urlStartDate) > date) {
      newStartDate = format.date(new Date(date), '-');
      newEndDate = urlStartDate;
    }

    if (urlStartDate && !urlEndDate && new Date(urlStartDate) < date) {
      newStartDate = urlStartDate;
      newEndDate = format.date(new Date(date), '-');
    }

    if (urlStartDate && urlEndDate) newStartDate = format.date(new Date(date), '-');

    setUrlParams((prev) => {
      return {
        ...prev,
        urlStartDate: newStartDate,
        urlEndDate: newEndDate,
      };
    });
  };

  const isSoonSelectedDate = (date: Date) => {
    if (!hoveredDay || !urlParams.urlStartDate) return false;

    const urlStartDateObject = new Date(urlParams.urlStartDate);

    if (hoveredDay > urlStartDateObject) {
      if (urlStartDateObject <= date && hoveredDay >= date) return true;

      return false;
    } else {
      if (urlStartDateObject >= date && hoveredDay <= date) return true;

      return false;
    }
  };

  const isIncludeSelectDate = (date: Date) => {
    if (!urlParams.urlStartDate || !urlParams.urlEndDate) return false;

    if (new Date(urlParams.urlStartDate) < date && new Date(urlParams.urlEndDate) >= date) return true;

    return false;
  };

  const updateHoverDays = (date: Date) => {
    if (!urlParams.urlStartDate) return;
    if (urlParams.urlStartDate && urlParams.urlEndDate) return;

    setHoveredDay(date);
  };

  useEffect(() => {
    setSearchParams({
      period: urlParams.urlPeriod,
      page: String(urlParams.urlPage),
      ...(urlParams.urlStartDate && { start: urlParams.urlStartDate }),
      ...(urlParams.urlEndDate && { end: urlParams.urlEndDate }),
    });
  }, [setSearchParams, urlParams]);

  const value = {
    period: urlParams.urlPeriod,
    startDate: urlParams.urlStartDate,
    endDate: urlParams.urlEndDate,
    page: urlParams.urlPage,
    hasSelectedCustomPeriod: !!urlParams.urlStartDate || !!urlParams.urlEndDate,
    triggerSearchRecord,
    isMiddleSelectedCustomDate: (date: Date) => isSoonSelectedDate(date) || isIncludeSelectDate(date),
    updateUrlPeriod,
    updateUrlStartEndDate,
    updateHoverDays,
    updateUrlPage,
  };
  return <MemberRecordPeriodContext.Provider value={value}>{children}</MemberRecordPeriodContext.Provider>;
};

export default MemberRecordPeriodProvider;

export const useMemberRecordPeriod = () => {
  const value = useContext(MemberRecordPeriodContext);

  if (!value) {
    throw new Error('MemberRecordPeriod 에러');
  }

  return value;
};
