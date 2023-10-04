import type { StudyBasicInfo } from './study';

export type MonthStorage = {
  day: number;
  dayOfWeek: number;
  date: Date;
  state: 'prev' | 'cur' | 'next';
}[];

export type CalendarRecord = {
  day: number;
  dayOfWeek: number;
  date: Date;
  state: 'prev' | 'cur' | 'next';
  records: StudyBasicInfo[];
  restRecordsNumber: number;
};
