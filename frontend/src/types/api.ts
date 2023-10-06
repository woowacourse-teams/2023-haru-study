import type { MemberInfo } from './member';
import type {
  ProgressInfo,
  RetrospectList,
  StudyInfo,
  Participant,
  ParticipantRecordContent,
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
} & StudyBasicInfo;

export type ResponsePlanList = PlanList;

export type ResponseStudyData = StudyBasicInfo;

export type ResponseMemberRecords = {
  studies: StudyBasicInfo[];
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

export type ResponseMemberListRecord = {
  studyRecords: StudyBasicInfo[];
  pageInfo: {
    pageNum: number;
    totalPages: number;
  };
};

export type ResponseMemberCalenderRecord = {
  studyRecords: Record<string, StudyBasicInfo[]>;
};
