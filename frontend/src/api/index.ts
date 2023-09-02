import prevHttp from '@Utils/http';

import type {
  ResponseMemberProgress,
  ResponseAuthToken,
  ResponseCreateStudy,
  ResponseMemberInfo,
  ResponseMemberRecordContents,
  ResponseOneStudyInfo,
  ResponseMemberContents,
  ResponseProgresses,
  ResponseStudies,
  ResponseStudyData,
  ResponseStudyDataList,
  ResponseStudyMembers,
} from '@Types/api';
import type { OAuthProvider } from '@Types/auth';
import type { PlanList, RetrospectList, StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

import http from './httpInstance';

const BASE_URL = '';

// 옛날거

export const requestRegisterMember = async (nickname: string, studyId: string) => {
  const response = await prevHttp.post(`${BASE_URL}/api/studies/${studyId}/members`, {
    body: JSON.stringify({ nickname }),
  });

  const locationHeader = response.headers.get('Location');
  const memberId = locationHeader?.split('/').pop() as string;

  return { memberId };
};

export const requestSubmitPlanningForm = (studyId: string, memberId: string, plans: PlanList) =>
  prevHttp.post(`/api/studies/${studyId}/members/${memberId}/content/plans`, {
    body: JSON.stringify(plans),
  });

export const requestGetStudyData = (studyId: string, accessToken: string) =>
  prevHttp.get<ResponseStudyData>(`/api/studies/${studyId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestGetMemberStudyListData = (memberId: string, accessToken: string) =>
  prevHttp.get<ResponseStudyDataList>(`/api/studies?memberId=${memberId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestGetStudyMembers = (studyId: string, accessToken: string) =>
  prevHttp.get<ResponseStudyMembers>(`/api/studies/${studyId}/progresses`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestGetMemberRecordContents = (studyId: string, progressId: string, accessToken: string) =>
  prevHttp.get<ResponseMemberRecordContents>(`/api/studies/${studyId}/contents?progressId=${progressId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

// 새로 적용되는 api
export const requestGuestLogin = async () => {
  const response = await prevHttp.post(`${BASE_URL}/api/auth/guest`);

  return (await response.json()) as ResponseAuthToken;
};

export const requestOAuthLogin = async (provider: OAuthProvider, code: string) => {
  const response = await prevHttp.post(`${BASE_URL}/api/auth/login`, {
    body: JSON.stringify({ oauthProvider: provider, code }),
  });

  return (await response.json()) as ResponseAuthToken;
};

export const requestMemberInfo = (accessToken: string) =>
  prevHttp.get<ResponseMemberInfo>('/api/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestAccessTokenRefresh = async () => {
  const response = await prevHttp.post(`${BASE_URL}/api/auth/refresh`);

  return (await response.json()) as ResponseAuthToken;
};

export const requestGetOneStudyData = (accessToken: string, studyId: string) =>
  prevHttp.get<ResponseOneStudyInfo>(`${BASE_URL}/api/studies/${studyId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestGetMemberProgress = (accessToken: string, studyId: string, memberId: string) =>
  prevHttp.get<ResponseMemberProgress>(`${BASE_URL}/api/studies/${studyId}/progresses?memberId=${memberId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestGetMemberContents = (accessToken: string, studyId: string, progressId: string, cycle: number) =>
  prevHttp.get<ResponseMemberContents>(
    `${BASE_URL}/api/studies/${studyId}/contents?progressId=${progressId}&cycle=${cycle}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

export const requestWritePlan = (accessToken: string, studyId: string, progressId: string, plan: PlanList) =>
  prevHttp.post(`${BASE_URL}/api/studies/${studyId}/contents/write-plan`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ progressId, plan: plan }),
  });

export const requestWriteRetrospect = (
  accessToken: string,
  studyId: string,
  progressId: string,
  retrospect: RetrospectList,
) =>
  prevHttp.post(`${BASE_URL}/api/studies/${studyId}/contents/write-retrospect`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ progressId, retrospect: retrospect }),
  });

export const requestNextStep = (accessToken: string, studyId: string, progressId: string) =>
  prevHttp.post(`${BASE_URL}/api/studies/${studyId}/progresses/${progressId}/next-step`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestPostCreateStudy = async (
  studyName: string,
  totalCycle: TotalCycleOptions,
  timePerCycle: StudyTimePerCycleOptions,
) => {
  const response = await http.post<ResponseCreateStudy>(`/api/studies`, {
    body: JSON.stringify({ name: studyName, totalCycle, timePerCycle }),
  });

  const locationHeader = response.headers.get('Location');
  const studyId = locationHeader?.split('/').pop() as string;

  return { studyId, response };
};

export const requestGetAuthenticateParticipationCode = (participantCode: string) =>
  http.get<ResponseStudies>(`/api/studies?participantCode=${participantCode}`);

export const requestCheckProgresses = async (studyId: string, memberId: string, accessToken: string) =>
  prevHttp.get<ResponseProgresses>(`/api/studies/${studyId}/progresses?memberId=${memberId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestRegisterProgress = (nickname: string, studyId: string, memberId: string, accessToken: string) =>
  prevHttp.post(`/api/studies/${studyId}/progresses`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ memberId, nickname }),
  });

export const requestDeleteProgress = (studyId: string, progressId: number, accessToken: string) =>
  prevHttp.delete(`/api/studies/${studyId}/progresses/${progressId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
