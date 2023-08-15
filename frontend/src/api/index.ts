import http from '@Utils/http';

import type {
  ResponseAuthToken,
  ResponseCreateStudy,
  ResponseMemberInfo,
  ResponseMemberRecordContents,
  ResponseMemberStudyMetadata,
  ResponsePlanList,
  ResponseProgresses,
  ResponseStudies,
  ResponseStudyMetadata,
} from '@Types/api';
import type { OAuthProvider } from '@Types/auth';
import type { PlanList, RetrospectList, StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

import { ExpiredAccessTokenError, NotExistProgressesError } from '../errors/CustomError';

const BASE_URL = '/api/v2';

// 옛날거
export const requestSubmitPlanningForm = (studyId: string, memberId: string, plans: PlanList) =>
  http.post(`/api/studies/${studyId}/members/${memberId}/content/plans`, {
    body: JSON.stringify(plans),
  });

export const requestSubmitRetrospectForm = (studyId: string, memberId: string, retrospects: RetrospectList) =>
  http.post(`/api/studies/${studyId}/members/${memberId}/content/retrospects`, { body: JSON.stringify(retrospects) });

export const requestGetMemberStudyMetadata = (studyId: string, memberId: string) =>
  http.get<ResponseMemberStudyMetadata>(`/api/studies/${studyId}/members/${memberId}/metadata`);

export const requestGetStudyingContent = (studyId: string, memberId: string, cycle: number) =>
  http.get<ResponsePlanList>(`/api/studies/${studyId}/members/${memberId}/content/plans?cycle=${cycle}`);

export const requestSubmitStudyingForm = (studyId: string, memberId: string) =>
  http.post(`/api/studies/${studyId}/members/${memberId}/next-step`);

export const requestGetStudyData = (studyId: string) =>
  http.get<Omit<ResponseStudyMetadata, 'member'>>(`${BASE_URL}/studies/${studyId}`);

export const requestGetStudyMembers = (studyId: string) =>
  http.get<Pick<ResponseStudyMetadata, 'members'>>(`${BASE_URL}/members?studyId=${studyId}`);

export const requestGetMemberRecordContents = (studyId: string, memberId: string) =>
  http.get<ResponseMemberRecordContents>(`${BASE_URL}/studies/${studyId}/contents?memberId=${memberId}`);

// 새로 적용되는 api
export const requestGuestLogin = async () => {
  const response = await http.post('/api/auth/guest');

  return (await response.json()) as ResponseAuthToken;
};

export const requestOAuthLogin = async (provider: OAuthProvider, code: string) => {
  const response = await http.post('/api/auth/login', {
    body: JSON.stringify({ oauthProvider: provider, code }),
  });

  return (await response.json()) as ResponseAuthToken;
};

export const requestMemberInfo = (accessToken: string, memberId: string) =>
  http.get<ResponseMemberInfo>(`/api/members/${memberId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestAccessTokenRefresh = async () => {
  const response = await http.post(`/api/auth/refresh`);

  return (await response.json()) as ResponseAuthToken;
};

export const requestCreateStudy = async (
  studyName: string,
  totalCycle: TotalCycleOptions,
  timePerCycle: StudyTimePerCycleOptions,
  accessToken: string,
) => {
  const response = await http.post(`/api/v2/studies`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ name: studyName, totalCycle, timePerCycle }),
  });

  const locationHeader = response.headers.get('Location');
  const studyId = locationHeader?.split('/').pop() as string;

  const result = (await response.json()) as ResponseCreateStudy;

  return { studyId, result };
};

export const requestAuthenticateParticipationCode = (participantCode: string, accessToken: string) =>
  http.get<ResponseStudies>(`/api/v2/studies?participantCode=${participantCode}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const requestCheckProgresses = async (studyId: string, memberId: string, accessToken: string) => {
  const response = await fetch(`/api/v2/studies/${studyId}/progresses?memberId=${memberId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status >= 200 && response.status < 300) {
    return (await response.json()) as ResponseProgresses;
  }

  if (response.status === 401) throw new ExpiredAccessTokenError('토큰이 만료되었습니다.', response.status);

  if (response.status === 404) throw new NotExistProgressesError('progresses가 존재하지 않아요.', response.status);

  throw new Error('에러가 발생했습니다.');
};

export const requestRegisterProgress = (nickname: string, studyId: string, memberId: string, accessToken: string) =>
  http.post(`/api/v2/studies/${studyId}/progresses`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ memberId, nickname }),
  });
