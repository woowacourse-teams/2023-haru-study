export type AdminDataType =
  | 'studies'
  | 'todayDoneStudies'
  | 'todayCreatedStudies'
  | 'participants'
  | 'participantsCode'
  | 'member';

export type Study = {
  id: number;
  name: string;
  totalCycle: number;
  timePerCycle: number;
  currentCycle: number;
  step: string;
  createdDate: string;
  lastModifiedDate: string;
};

export type Plan = 'toDo' | 'completionCondition' | 'expectedProbability' | 'expectedDifficulty' | 'whatCanYouDo';

export type PlanList = Record<Plan, string>;

export type Retrospect = 'doneAsExpected' | 'experiencedDifficulty' | 'lesson';

export type RetrospectList = Record<Retrospect, string>;

export type Content = {
  id: number;
  participantId: string;
  cycle: number;
  plan: Partial<PlanList>;
  retrospect: Partial<RetrospectList>;
};

export type Participant = {
  id: number;
  studyId: number;
  memberId: number;
  nickname: string;
  isHost: boolean;
};

export type ParticipantCodes = {
  id: number;
  studyId: number;
  code: string;
};

export type MemberInfo = {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  loginType: string;
};
