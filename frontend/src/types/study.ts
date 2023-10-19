import type { STUDY_TIME_PER_CYCLE_OPTIONS, TOTAL_CYCLE_OPTIONS } from '@Constants/study';

export type TotalCycleOptions = (typeof TOTAL_CYCLE_OPTIONS)[number];

export type StudyTimePerCycleOptions = (typeof STUDY_TIME_PER_CYCLE_OPTIONS)[number];

export type StudyStatus = 'waiting' | 'inProgress' | 'done';

export type Step = 'planning' | 'studying' | 'retrospect';

export type Member = {
  memberId: string;
  nickname: string;
};

export type Progress = {
  currentCycle: number;
  step: Step;
};

export type Participant = {
  participantId: string;
  nickname: string;
  isHost: boolean;
};

export type ParticipantRecordContent = {
  cycle: number;
  plan: PlanList;
  retrospect: RetrospectList;
};

export type Plan = 'toDo' | 'completionCondition' | 'expectedProbability' | 'expectedDifficulty' | 'whatCanYouDo';

export type PlanList = Record<Plan, string>;

export type Retrospect = 'doneAsExpected' | 'experiencedDifficulty' | 'lesson';

export type RetrospectList = Record<Retrospect, string>;

export type StudyInfo = {
  studyId: string;
  name: string;
  totalCycle: number;
  timePerCycle: number;
  currentCycle: number;
  studyStep: StudyStatus;
  progressStep: Step;
  createdDate: string;
  lastModifiedDate: string;
};

export type StudyMode = 'group' | 'alone';
