import http from '@Utils/http';

import type {
  ResponseMemberProgress,
  ResponseAuthToken,
  ResponseCreateStudy,
  ResponseIsCheckMember,
  ResponseMemberInfo,
  ResponseMemberRecordContents,
  ResponseOneStudyInfo,
  ResponseStudyInfo,
  ResponseStudyMetadata,
  ResponseMemberContents,
} from '@Types/api';
import type { OAuthProvider } from '@Types/auth';
import type { PlanList, RetrospectList, StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

const BASE_URL = '';

// 옛날거
export const requestCreateStudy = async (
  studyName: string,
  totalCycle: TotalCycleOptions,
  timePerCycle: StudyTimePerCycleOptions,
) => {
  const response = await http.post(`${BASE_URL}/api/studies`, {
    body: JSON.stringify({ name: studyName, totalCycle, timePerCycle }),
  });

  const locationHeader = response.headers.get('Location');
  const studyId = locationHeader?.split('/').pop() as string;

  const result = (await response.json()) as ResponseCreateStudy;

  return { studyId, result };
};

export const requestRegisterMember = async (nickname: string, studyId: string) => {
  const response = await http.post(`${BASE_URL}/api/studies/${studyId}/members`, {
    body: JSON.stringify({ nickname }),
  });

  const locationHeader = response.headers.get('Location');
  const memberId = locationHeader?.split('/').pop() as string;

  return { memberId };
};

export const requestAuthenticateParticipationCode = async (participantCode: string) => {
  const response = await http.post(`${BASE_URL}/api/studies/authenticate`, {
    body: JSON.stringify({ participantCode }),
  });

  return (await response.json()) as ResponseStudyInfo;
};

export const requestCheckIsMember = (studyId: string, memberId: string) =>
  http.get<ResponseIsCheckMember>(`${BASE_URL}/api/studies/${studyId}/members/${memberId}`);

// export const requestSubmitPlanningForm = (studyId: string, memberId: string, plans: PlanList) =>
//   http.post(`${BASE_URL}/api/studies/${studyId}/members/${memberId}/content/plans`, {
//     body: JSON.stringify(plans),
//   });

// export const requestSubmitRetrospectForm = (studyId: string, memberId: string, retrospects: RetrospectList) =>
//   http.post(`${BASE_URL}/api/studies/${studyId}/members/${memberId}/content/retrospects`, { body: JSON.stringify(retrospects) });

// export const requestGetMemberStudyMetadata = (studyId: string, memberId: string) =>
//   http.get<ResponseMemberStudyMetadata>(`${BASE_URL}/api/studies/${studyId}/members/${memberId}/metadata`);

// export const requestGetStudyingContent = (studyId: string, memberId: string, cycle: number) =>
//   http.get<ResponsePlanList>(`${BASE_URL}/api/studies/${studyId}/members/${memberId}/content/plans?cycle=${cycle}`);

// export const requestSubmitStudyingForm = (studyId: string, memberId: string) =>
//   http.post(`${BASE_URL}/api/studies/${studyId}/members/${memberId}/next-step`);

export const requestGetStudyData = (studyId: string) =>
  http.get<Omit<ResponseStudyMetadata, 'member'>>(`${BASE_URL}/studies/${studyId}`);

export const requestGetStudyMembers = (studyId: string) =>
  http.get<Pick<ResponseStudyMetadata, 'members'>>(`${BASE_URL}/members?studyId=${studyId}`);

export const requestGetMemberRecordContents = (studyId: string, memberId: string) =>
  http.get<ResponseMemberRecordContents>(`${BASE_URL}/studies/${studyId}/contents?memberId=${memberId}`);

// 새로 적용되는 api
export const requestGuestLogin = async () => {
  const response = await http.post(`${BASE_URL}/api/auth/guest`);

  return (await response.json()) as ResponseAuthToken;
};

export const requestOAuthLogin = async (provider: OAuthProvider, code: string) => {
  const response = await http.post(`${BASE_URL}/api/auth/login`, {
    body: JSON.stringify({ oauthProvider: provider, code }),
  });

  return (await response.json()) as ResponseAuthToken;
};

export const requestMemberInfo = (accessToken: string, memberId: string) =>
  http.get<ResponseMemberInfo>(`${BASE_URL}/api/members/${memberId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestAccessTokenRefresh = async () => {
  const response = await http.post(`${BASE_URL}/api/auth/refresh`);

  return (await response.json()) as ResponseAuthToken;
};

export const requestGetOneStudyData = (accessToken: string, studyId: string) =>
  http.get<ResponseOneStudyInfo>(`${BASE_URL}/api/studies/${studyId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestGetMemberProgress = (accessToken: string, studyId: string, memberId: string) =>
  http.get<ResponseMemberProgress>(`${BASE_URL}/api/studies/${studyId}/progresses?memberId=${memberId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestGetMemberContents = (accessToken: string, studyId: string, progressId: string, cycle: number) =>
  http.get<ResponseMemberContents>(
    `${BASE_URL}/api/studies/${studyId}/contents?progressId=${progressId}&cycle=${cycle}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

export const requestWritePlan = (accessToken: string, studyId: string, progressId: string, plan: PlanList) =>
  http.post(`${BASE_URL}/api/studies/${studyId}/contents/write-plan`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ progressId, plan: plan }),
  });

export const requestWriteRetrospect = (
  accessToken: string,
  studyId: string,
  progressId: string,
  retrospect: RetrospectList,
) =>
  http.post(`${BASE_URL}/api/studies/${studyId}/contents/write-retrospect`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ progressId, retrospect: retrospect }),
  });

export const requestNextStep = (accessToken: string, studyId: string, progressId: string) =>
  http.post(`${BASE_URL}/api/studies/${studyId}/progresses/${progressId}/next-step`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
