import type { MemberInfo } from './member';
import type {
  RetrospectList,
  StudyInfo,
  Participant,
  ParticipantRecordContent,
  PlanList,
  StudyStatus,
  Step,
} from './study';

export type ResponseAPIError = {
  message: string;
  code: number;
};

export type ResponseStudies = {
  studies: StudyInfo[];
};

type ResponseParticipantInfo = {
  participantId: number;
  nickname: string;
  isHost: boolean;
};

export type ResponseCheckParticipants = {
  participants: ResponseParticipantInfo[] | null;
};

export type ResponsePlanList = PlanList;

export type ResponseMemberRecords = {
  studies: StudyInfo[];
};

export type ResponseStudyParticipants = {
  participants: Participant[];
};

export type ResponseParticipantRecordContents = {
  content: ParticipantRecordContent[];
};

export type ResponseAuthToken = {
  accessToken: string;
};

export type ResponseMemberInfo = MemberInfo;

export type ResponseStudyInfo = StudyInfo;

export type ResponseMemberContents = {
  content: {
    cycle: number;
    plan: Partial<PlanList>;
    retrospect: Partial<RetrospectList>;
  }[];
};

export type ResponseParticipantCode = {
  participantCode: string;
};

export type ResponseLobbyInfo = {
  studyStep: StudyStatus;
  participants: Participant[];
};

export type ResponseMemberSubmitStatus = {
  status: {
    nickname: string;
    submitted: boolean;
  }[];
};

export type ResponseCurrentStep = {
  progressStep: Step;
};

export type ResponseMemberListRecord = {
  studyRecords: StudyInfo[];
  pageInfo: {
    pageNum: number;
    totalPages: number;
  };
};

export type ResponseMemberCalenderRecord = {
  studyRecords: Record<string, StudyInfo[]>;
};
