import type { MemberInfo } from './member';
import type { MemberProgress, MemberRecordContent, PlanList, Step, StudyBasicInfo } from './study';

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
  progresses: MemberProgress[];
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
