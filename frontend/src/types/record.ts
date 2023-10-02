export type MonthStorage = {
  day: number;
  dayOfWeek: number;
  fullDate: string;
  state: 'prev' | 'cur' | 'next';
}[];
