import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

import useSearchParams from '@Hooks/common/useSearchParams';

import type { PERIOD } from '@Constants/record';

import format from '@Utils/format';

export type Period = keyof typeof PERIOD;

export type MemberRecordPeriodContextType = {
  period: Period;
  startDate: Date | null;
  endDate: Date | null;
  page: number;
  hasSelectedCustomPeriod: boolean;
  triggerSearchRecord: number;
  updatePeriod: (period: Period) => void;
  updateStartEndDate: (startDate: Date | null, endDate: Date | null) => void;
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

  const updateStartEndDate = (startDate: Date | null, endDate: Date | null) => {
    updateSearchParams({
      start: startDate ? format.date(new Date(startDate), '-') : null,
      end: endDate ? format.date(new Date(endDate), '-') : null,
    });
  };

  const value = {
    period: searchParams.period,
    startDate: searchParams.start ? new Date(searchParams.start) : null,
    endDate: searchParams.end ? new Date(searchParams.end) : null,
    page: searchParams.page ? Number(searchParams.page) : 1,
    hasSelectedCustomPeriod: !!searchParams.start || !!searchParams.end,
    triggerSearchRecord,
    updatePeriod,
    updateStartEndDate,
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
