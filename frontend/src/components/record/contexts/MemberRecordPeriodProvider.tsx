import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

import type { PERIOD } from '@Constants/record';

export type Period = keyof typeof PERIOD;

export type MemberRecordPeriodContextType = {
  period: Period | null;
  startDate: Date | null;
  endDate: Date | null;
  hasSelectedCustomPeriod: boolean;
  isMiddleSelectedCustomDate: (date: Date) => boolean;
  handlePeriod: (period: Period | null) => void;
  handleCustomPeriod: (date: Date) => void;
  handleHoverDays: (date: Date) => void;
};

const MemberRecordPeriodContext = createContext<MemberRecordPeriodContextType | null>(null);

const MemberRecordPeriodProvider = ({ children }: PropsWithChildren) => {
  const [period, setPeriod] = useState<Period | null>('entire');
  const [customPeriod, setCustomPeriod] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

  const isSoonSelectedDate = (date: Date) => {
    if (!hoveredDay || !customPeriod.start) return false;

    if (hoveredDay > customPeriod.start) {
      if (customPeriod.start <= date && hoveredDay >= date) return true;

      return false;
    } else {
      if (customPeriod.start >= date && hoveredDay <= date) return true;

      return false;
    }
  };

  const isIncludeSelectDate = (date: Date) => {
    if (!customPeriod.start || !customPeriod.end) return false;

    if (customPeriod.start < date && customPeriod.end >= date) return true;

    return false;
  };

  const handlePeriod = (period: Period | null) => setPeriod(period);

  const handleCustomPeriod = (date: Date) => {
    setHoveredDay(date);

    if (!customPeriod.start) {
      setCustomPeriod({ start: date, end: null });

      return;
    }

    if (!customPeriod.end) {
      setCustomPeriod((prev) => {
        if (prev.start! > date) return { start: date, end: prev.start };
        return { ...prev, end: date };
      });

      return;
    }

    setCustomPeriod({ start: date, end: null });
  };

  const handleHoverDays = (date: Date) => {
    if (!customPeriod.start) return;
    if (customPeriod.start && customPeriod.end) return;

    setHoveredDay(date);
  };

  const value = {
    period,
    startDate: customPeriod.start,
    endDate: customPeriod.end,
    hasSelectedCustomPeriod: !!customPeriod.start || !!customPeriod.end,
    isMiddleSelectedCustomDate: (date: Date) => isSoonSelectedDate(date) || isIncludeSelectDate(date),
    handlePeriod,
    handleCustomPeriod,
    handleHoverDays,
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
