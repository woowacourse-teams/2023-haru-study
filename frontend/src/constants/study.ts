export type Step = 'planning' | 'studying' | 'retrospect';

export type StudyData = {
  studyName: string;
  totalCycle: number;
  currentCycle: number;
  timePerCycle: number;
  step: Step;
};
