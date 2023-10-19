import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

import useSearchParams from '@Hooks/common/useSearchParams';

import type { PERIOD } from '@Constants/record';

import format from '@Utils/format';

export type Period = keyof typeof PERIOD;

export type MemberRecordPeriodContextType = {
  period: Period;
  startDate?: string;
  endDate?: string;
  page: number;
  hasSelectedCustomPeriod: boolean;
  triggerSearchRecord: number;
  isMiddleSelectedCustomDate: (date: Date) => boolean;
  updatePeriod: (period: Period) => void;
  updateStartEndDate: (date: Date) => void;
  updateHoverDays: (date: Date) => void;
  updatePage: (page: number) => void;
};

const MemberRecordPeriodContext = createContext<MemberRecordPeriodContextType | null>(null);

const MemberRecordPeriodProvider = ({ children }: PropsWithChildren) => {
  const { searchParams, updateSearchParams } = useSearchParams<{
    period: Period;
    page: string;
    start?: string;
    end?: string;
  }>();

  const [triggerSearchRecord, setTriggerSearchRecord] = useState(0);
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

  const updatePeriod = (period: Period) => {
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
      newStartDate = searchParams.start!;
      newEndDate = searchParams.end!;
    }

    updateSearchParams({
      period,
      page: '1',
      start: newStartDate,
      end: newEndDate,
    });

    setTriggerSearchRecord((prev) => prev + 1);
  };

  const updatePage = (page: number) => {
    updateSearchParams({ page: String(page) });

    setTriggerSearchRecord((prev) => prev + 1);
  };

  const updateStartEndDate = (date: Date) => {
    setHoveredDay(date);

    let newStartDate: null | string = null;
    let newEndDate: null | string = null;

    if (!searchParams.start) newStartDate = format.date(new Date(date), '-');

    if (searchParams.start && !searchParams.end && new Date(searchParams.start) > date) {
      newStartDate = format.date(new Date(date), '-');
      newEndDate = searchParams.start;
    }

    if (searchParams.start && !searchParams.end && new Date(searchParams.start) < date) {
      newStartDate = searchParams.start;
      newEndDate = format.date(new Date(date), '-');
    }

    if (searchParams.start && searchParams.end) newStartDate = format.date(new Date(date), '-');

    updateSearchParams({
      start: newStartDate,
      end: newEndDate,
    });
  };

  const isSoonSelectedDate = (date: Date) => {
    if (!hoveredDay || !searchParams.start) return false;

    const startDateObject = new Date(searchParams.start);

    if (hoveredDay > startDateObject) {
      if (startDateObject <= date && hoveredDay >= date) return true;

      return false;
    } else {
      if (startDateObject >= date && hoveredDay <= date) return true;

      return false;
    }
  };

  const isIncludeSelectDate = (date: Date) => {
    if (!searchParams.start || !searchParams.end) return false;

    if (new Date(searchParams.start) < date && new Date(searchParams.end) >= date) return true;

    return false;
  };

  const updateHoverDays = (date: Date) => {
    if (!searchParams.start) return;
    if (searchParams.start && searchParams.end) return;

    setHoveredDay(date);
  };

  const value = {
    period: searchParams.period,
    startDate: searchParams.start,
    endDate: searchParams.end,
    page: searchParams.page ? Number(searchParams.page) : 1,
    hasSelectedCustomPeriod: !!searchParams.start || !!searchParams.end,
    triggerSearchRecord,
    isMiddleSelectedCustomDate: (date: Date) => isSoonSelectedDate(date) || isIncludeSelectDate(date),
    updatePeriod,
    updateStartEndDate,
    updateHoverDays,
    updatePage,
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
