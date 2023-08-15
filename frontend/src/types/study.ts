import type { STUDY_TIME_PER_CYCLE_OPTIONS, TOTAL_CYCLE_OPTIONS } from '@Constants/study';

export type TotalCycleOptions = (typeof TOTAL_CYCLE_OPTIONS)[number];

export type StudyTimePerCycleOptions = (typeof STUDY_TIME_PER_CYCLE_OPTIONS)[number];

export type Step = 'planning' | 'studying' | 'retrospect';

export type Member = {
  memberId: string;
  nickname: string;
};

export type Progress = {
  currentCycle: number;
  step: Step;
};

export type StudyBasicInfo = {
  studyName: string;
  timePerCycle: StudyTimePerCycleOptions;
  totalCycle: TotalCycleOptions;
  createdDateTime: string;
};

export type StudyData = {
  studyId: string;
  memberId: string;
} & StudyBasicInfo &
  Progress;

export type MemberRecordContent = {
  cycle: number;
  plan: PlanList;
  retrospect: RetrospectList;
};

export type Plan = 'toDo' | 'completionCondition' | 'expectedProbability' | 'expectedDifficulty' | 'whatCanYouDo';

export type PlanList = Record<Plan, string>;

export type Retrospect = 'doneAsExpected' | 'experiencedDifficulty' | 'lesson';

export type RetrospectList = Record<Retrospect, string>;
