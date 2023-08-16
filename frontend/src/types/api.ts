import type { MemberInfo } from './member';
import type {
  Member,
  MemberRecordContent,
  PlanList,
  Step,
  StudyBasicInfo,
  StudyTimePerCycleOptions,
  TotalCycleOptions,
} from './study';

export type ResponseAPIError = {
  message: string;
  code: string;
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

export type ResponseStudyMetadata = {
  members: Member[];
} & StudyBasicInfo;

export type ResponseMemberRecordContents = {
  content: MemberRecordContent[];
};

type ResponseProgress = {
  progressId: string;
  nickname: string;
  currentCycle: number;
  step: Step;
};

export type ResponseProgresses = {
  progresses: ResponseProgress[];
};

export type ResponseAuthToken = {
  accessToken: string;
};

export type ResponseMemberInfo = MemberInfo;
