import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

import type { PERIOD } from '@Constants/record';

export type Period = keyof typeof PERIOD;

export type MemberRecordPeriodContextType = {
  period: Period | null;
  startDate: string | null;
  endDate: string | null;
  hasSelectedCustomPeriod: boolean;
  isMiddleSelectedCustomDate: (date: string) => boolean;
  handlePeriod: (period: Period | null) => void;
  handleCustomPeriod: (date: string) => void;
  handleHoverDays: (date: string) => void;
};

const MemberRecordPeriodContext = createContext<MemberRecordPeriodContextType | null>(null);

const MemberRecordPeriodProvider = ({ children }: PropsWithChildren) => {
  const [period, setPeriod] = useState<Period | null>('entire');
  const [customPeriod, setCustomPeriod] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const isSoonSelectedDate = (date: string) => {
    if (!hoveredDay || !customPeriod.start) return false;

    if (new Date(hoveredDay) > new Date(customPeriod.start)) {
      if (new Date(customPeriod.start) <= new Date(date) && new Date(hoveredDay) >= new Date(date)) return true;

      return false;
    } else {
      if (new Date(customPeriod.start) >= new Date(date) && new Date(hoveredDay) <= new Date(date)) return true;

      return false;
    }
  };

  const isIncludeSelectDate = (date: string) => {
    if (!customPeriod.start || !customPeriod.end) return false;

    if (new Date(customPeriod.start) < new Date(date) && new Date(customPeriod.end) >= new Date(date)) return true;

    return false;
  };

  const handlePeriod = (period: Period | null) => setPeriod(period);

  const handleCustomPeriod = (fullDateDot: string) => {
    setHoveredDay(fullDateDot);

    if (!customPeriod.start) {
      setCustomPeriod({ start: fullDateDot, end: null });

      return;
    }

    if (!customPeriod.end) {
      setCustomPeriod((prev) => {
        const startDateObject = new Date(prev.start!);
        const endDateObject = new Date(fullDateDot);

        if (startDateObject > endDateObject) return { start: fullDateDot, end: prev.start };
        return { ...prev, end: fullDateDot };
      });

      return;
    }

    setCustomPeriod({ start: fullDateDot, end: null });
  };

  const handleHoverDays = (date: string) => {
    if (!customPeriod.start) return;
    if (customPeriod.start && customPeriod.end) return;

    setHoveredDay(date);
  };

  const value = {
    period,
    startDate: customPeriod.start,
    endDate: customPeriod.end,
    hasSelectedCustomPeriod: !!customPeriod.start || !!customPeriod.end,
    isMiddleSelectedCustomDate: (date: string) => isSoonSelectedDate(date) || isIncludeSelectDate(date),
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
