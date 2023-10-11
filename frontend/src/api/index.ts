import type {
  ResponseMemberProgress,
  ResponseAuthToken,
  ResponseMemberInfo,
  ResponseParticipantRecordContents,
  ResponseOneStudyInfo,
  ResponseMemberContents,
  ResponseStudies,
  ResponseMemberListRecord,
  ResponseMemberCalenderRecord,
  ResponseStudyParticipants,
  ResponseParticipantCode,
  ResponseLobbyInfo,
  ResponseCheckParticipants,
} from '@Types/api';
import type { OAuthProvider } from '@Types/auth';
import type { PlanList, RetrospectList, StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

import http from './httpInstance';

export const requestGetMemberListRecord = (
  memberId: string,
  page: number,
  size: number,
  startDate?: string,
  endDate?: string,
) => {
  if (startDate && endDate)
    return http.get<ResponseMemberListRecord>(
      `/api/view/study-records?memberId=${memberId}&page=${page}&size=${size}&startDate=${startDate}&endDate=${endDate}&sort=createdDate,desc`,
    );

  return http.get<ResponseMemberListRecord>(
    `/api/view/study-records?memberId=${memberId}&page=${page}&size=${size}&sort=createdDate,desc`,
  );
};

export const requestGetMemberCalendarRecord = (memberId: string, startDate: string, endDate: string) =>
  http.get<ResponseMemberCalenderRecord>(
    `/api/view/calendar/study-records?memberId=${memberId}&startDate=${startDate}&endDate=${endDate}`,
  );

export const requestGetStudyParticipants = (studyId: string) =>
  http.get<ResponseStudyParticipants>(`/api/studies/${studyId}/participants`);

export const requestGetParticipantRecordContents = (studyId: string, participantId: string) =>
  http.get<ResponseParticipantRecordContents>(`/api/studies/${studyId}/contents?participantId=${participantId}`);

export const requestPostGuestLogin = () => http.post<ResponseAuthToken>(`/api/auth/guest`);

export const requestPostOAuthLogin = (provider: OAuthProvider, code: string) =>
  http.post<ResponseAuthToken>(`/api/auth/login`, {
    body: JSON.stringify({ oauthProvider: provider, code }),
  });

export const requestPostLogout = () => http.post(`/api/auth/logout`);

export const requestGetMemberInfo = () => http.get<ResponseMemberInfo>('/api/me');

export const requestGetOneStudyData = async (studyId: string) => {
  const { data } = await http.get<ResponseOneStudyInfo>(`/api/studies/${studyId}`);

  return data;
};

export const requestGetMemberProgress = async (studyId: string, memberId: string) => {
  const { data } = await http.get<ResponseMemberProgress>(`/api/studies/${studyId}/progresses?memberId=${memberId}`);

  return data.progresses[0];
};

export const requestGetMemberContents = async (studyId: string, progressId: string, cycle: number) => {
  const { data } = await http.get<ResponseMemberContents>(
    `/api/studies/${studyId}/contents?progressId=${progressId}&cycle=${cycle}`,
  );

  return data.content[0].plan;
};

export const requestWritePlan = (studyId: string, progressId: string, plan: PlanList) =>
  http.post(`/api/studies/${studyId}/contents/write-plan`, {
    body: JSON.stringify({ progressId, plan: plan }),
  });

export const requestWriteRetrospect = (studyId: string, progressId: string, retrospect: RetrospectList) =>
  http.post(`/api/studies/${studyId}/contents/write-retrospect`, {
    body: JSON.stringify({ progressId, retrospect: retrospect }),
  });

export const requestPostCreateStudy = async (
  studyName: string,
  totalCycle: TotalCycleOptions | null,
  timePerCycle: StudyTimePerCycleOptions | null,
) => {
  const response = await http.post(`/api/studies`, {
    body: JSON.stringify({ name: studyName, totalCycle, timePerCycle }),
  });

  const locationHeader = response.headers.get('Location');
  const studyId = locationHeader?.split('/').pop() as string;

  return { studyId };
};

export const requestGetAuthenticateParticipationCode = async (participantCode: string) => {
  const response = await http.get<ResponseStudies>(`/api/studies?participantCode=${participantCode}`);

  return response.data;
};

export const requestGetCheckParticipants = async (studyId: string, memberId: string) => {
  const response = await http.get<ResponseCheckParticipants>(
    `/api/temp/studies/${studyId}/participants?memberId=${memberId}`,
  );

  return response.data;
};

export const requestPostRegisterParticipants = (nickname: string, studyId: string, memberId: string) =>
  http.post(`/api/studies/${studyId}/participants`, {
    body: JSON.stringify({ memberId, nickname }),
  });

export const requestDeleteParticipant = (studyId: string, participantId: number) =>
  http.delete(`/api/studies/${studyId}/participants/${participantId}`);

export const requestGetParticipantCode = async (studyId: string) => {
  const response = await http.get<ResponseParticipantCode>(`/api/participant-codes?studyId=${studyId}`);

  return response.data.participantCode;
};

export const requestGetParticipant = async (studyId: string, memberId: string) => {
  const response = await http.get<ResponseStudyParticipants>(
    `/api/studies/${studyId}/participants?memberId=${memberId}`,
  );

  return response.data.participants[0];
};

export const requestGetLobbyInfo = async (studyId: string) => {
  const response = await http.get<ResponseLobbyInfo>(`/api/waiting?studyId=${studyId}`);

  return response.data;
};

export const requestPostNextStep = (studyId: string) => http.post(`/api/studies/${studyId}/next-step`);
