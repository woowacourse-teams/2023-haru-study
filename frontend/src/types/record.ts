export type MonthStorage = {
  day: number;
  dayOfWeek: number;
  date: Date;
  state: 'prev' | 'cur' | 'next';
}[];
