import type { MemberInfo } from './member';
import type {
  Member,
  MemberRecordContent,
  PlanList,
  ProgressInfo,
  RetrospectList,
  Step,
  StudyBasicInfo,
  StudyInfo,
} from './study';

export type ResponseAPIError = {
  message: string;
  code: string;
};

export type ResponseCreateStudy = { participantCode: string; studyName: string };

export type ResponseStudyInfo = {
  studyId: string;
  studyName: string;
  nickname: string | null;
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

export type ResponseIsCheckMember = {
  nickname: string | null;
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
