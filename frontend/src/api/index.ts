import type {
  ResponseMemberProgress,
  ResponseAuthToken,
  ResponseCreateStudy,
  ResponseMemberInfo,
  ResponseMemberRecordContents,
  ResponseOneStudyInfo,
  ResponseMemberContents,
  ResponseStudies,
  ResponseStudyData,
  ResponseStudyDataList,
  ResponseStudyMembers,
  ResponseCheckProgresses,
} from '@Types/api';
import type { OAuthProvider } from '@Types/auth';
import type { PlanList, RetrospectList, StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

import http from './httpInstance';

export const requestGetStudyData = (studyId: string) => http.get<ResponseStudyData>(`/api/studies/${studyId}`);

export const requestGetMemberStudyListData = (memberId: string) =>
  http.get<ResponseStudyDataList>(`/api/studies?memberId=${memberId}`);

export const requestGetStudyMembers = (studyId: string) =>
  http.get<ResponseStudyMembers>(`/api/studies/${studyId}/participants`);

export const requestGetMemberRecordContents = (studyId: string, progressId: string) =>
  http.get<ResponseMemberRecordContents>(`/api/studies/${studyId}/contents?progressId=${progressId}`);

export const requestPostGuestLogin = () => http.post<ResponseAuthToken>(`/api/auth/guest`);

export const requestPostOAuthLogin = (provider: OAuthProvider, code: string) =>
  http.post<ResponseAuthToken>(`/api/auth/login`, {
    body: JSON.stringify({ oauthProvider: provider, code }),
  });

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

export const requestNextStep = (studyId: string, progressId: string) =>
  http.post(`/api/studies/${studyId}/progresses/${progressId}/next-step`);

export const requestPostCreateStudy = async (
  studyName: string,
  totalCycle: TotalCycleOptions | null,
  timePerCycle: StudyTimePerCycleOptions | null,
) => {
  const response = await http.post<ResponseCreateStudy>(`/api/studies`, {
    body: JSON.stringify({ name: studyName, totalCycle, timePerCycle }),
  });

  const locationHeader = response.headers.get('Location');
  const studyId = locationHeader?.split('/').pop() as string;

  const data = response.data;

  return { studyId, data };
};

export const requestGetAuthenticateParticipationCode = async (participantCode: string) => {
  const response = http.get<ResponseStudies>(`/api/studies?participantCode=${participantCode}`);

  return (await response).data;
};

export const requestGetCheckProgresses = async (studyId: string, memberId: string) => {
  const response = http.get<ResponseCheckProgresses>(`/api/temp/studies/${studyId}/progresses?memberId=${memberId}`);

  return (await response).data;
};

export const requestPostRegisterProgress = (nickname: string, studyId: string, memberId: string) =>
  http.post(`/api/studies/${studyId}/progresses`, {
    body: JSON.stringify({ memberId, nickname }),
  });

export const requestDeleteProgress = (studyId: string, progressId: number) =>
  http.delete(`/api/studies/${studyId}/progresses/${progressId}`);
