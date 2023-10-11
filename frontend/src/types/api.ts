import type { MemberInfo } from './member';
import type {
  ProgressInfo,
  RetrospectList,
  StudyInfo,
  Participant,
  ParticipantRecordContent,
  PlanList,
  Step,
  StudyTimePerCycleOptions,
  TotalCycleOptions,
  StudyStatus,
} from './study';

export type ResponseAPIError = {
  message: string;
  code: number;
};

type ResponseStudyInfo = {
  studyId: string;
  name: string;
  totalCycle: TotalCycleOptions;
  timePerCycle: StudyTimePerCycleOptions;
  currentCycle: number;
  studyStep: string;
  progressStep: string;
  createdDate: string;
  lastModifiedDate: string;
};

export type ResponseStudies = {
  studies: ResponseStudyInfo[];
};

type ResponseParticipantInfo = {
  participantId: number;
  nickname: string;
  isHost: boolean;
};

export type ResponseCheckParticipants = {
  participants: ResponseParticipantInfo[] | null;
};

export type ResponseMemberStudyMetadata = {
  currentCycle: number;
  step: Step;
} & StudyInfo;

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

export type ResponseParticipantCode = {
  participantCode: string;
};

export type ResponseLobbyInfo = {
  studyStep: StudyStatus;
  participants: Participant[];
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
