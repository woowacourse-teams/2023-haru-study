import type { MemberInfo } from './member';
import type {
  ProgressInfo,
  RetrospectList,
  StudyInfo,
  Participant,
  MemberRecordContent,
  PlanList,
  Step,
  StudyBasicInfo,
  StudyTimePerCycleOptions,
  TotalCycleOptions,
} from './study';

export type ResponseAPIError = {
  message: string;
  code: number;
};

export type ResponseCreateStudy = { participantCode: string; studyName: string };

type ResponseStudyInfo = {
  studyId: string;
  name: string;
  totalCycle: TotalCycleOptions;
  timePerCycle: StudyTimePerCycleOptions;
  createdDateTime: Date;
};

export type ResponseStudies = {
  studies: ResponseStudyInfo[];
};

export type ResponseMemberStudyMetadata = {
  currentCycle: number;
  step: Step;
} & StudyBasicInfo;

export type ResponsePlanList = PlanList;

export type ResponseStudyData = StudyBasicInfo;

export type ResponseStudyDataList = {
  studies: StudyBasicInfo[];
};

export type ResponseStudyMembers = {
  participants: Participant[];
};

export type ResponseMemberRecordContents = {
  content: MemberRecordContent[];
};

type ResponseProgress = {
  progressId: number;
  nickname: string;
  currentCycle: number;
  step: Step;
};

export type ResponseCheckProgresses = {
  progresses: ResponseProgress[] | null;
};

export type ResponseAuthToken = {
  accessToken: string;
};

export type ResponseMemberInfo = MemberInfo;

export type ResponseOneStudyInfo = StudyInfo;

export type ResponseMemberProgress = {
  progresses: ProgressInfo[];
};

export type ResponseMemberContents = {
  content: {
    cycle: number;
    plan: PlanList;
    retrospect: RetrospectList;
  }[];
};
