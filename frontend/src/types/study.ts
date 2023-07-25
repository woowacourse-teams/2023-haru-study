export type Step = 'planning' | 'studying' | 'retrospect';

export type StudyData = {
  studyName: string;
  totalCycle: number;
  currentCycle: number;
  timePerCycle: number;
  step: Step;
};

export type Plan = {
  toDo: string;
  completionCondition: string;
  expectedProbability: string;
  expectedDifficulty: string;
  whatCanYouDo: string;
};

export type Retrospect = {
  doneAsExpected: string;
  experiencedDifficulty: string;
  lesson: string;
};
