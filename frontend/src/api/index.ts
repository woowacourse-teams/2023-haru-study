import http from '@Utils/http';

import type {
  ResponseCreateStudy,
  ResponseIsCheckMember,
  ResponseMemberRecordContents,
  ResponseMemberStudyMetadata,
  ResponsePlanList,
  ResponseStudyInfo,
  ResponseStudyMetadata,
} from '@Types/api';
import type { PlanList, RetrospectList, StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

export const requestCreateStudy = async (
  studyName: string,
  totalCycle: TotalCycleOptions,
  timePerCycle: StudyTimePerCycleOptions,
) => {
  const response = await fetch(`/api/studies`, {
    body: JSON.stringify({ name: studyName, totalCycle, timePerCycle }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const locationHeader = response.headers.get('Location');
  const studyId = locationHeader?.split('/').pop() as string;

  const result = (await response.json()) as ResponseCreateStudy;

  return { studyId, result };
};

export const requestRegisterMember = async (nickname: string | null, studyId: string | null) => {
  const response = await fetch(`/api/studies/${studyId ?? ''}/members`, {
    body: JSON.stringify({ nickname }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw Error('사용할 수 없는 닉네임입니다.');
  }

  const locationHeader = response.headers.get('Location');
  const memberId = locationHeader?.split('/').pop() as string;

  return { memberId };
};

export const requestAuthenticateParticipationCode = async (participantCode: string) => {
  const response = await http.post(`/api/studies/authenticate`, {
    body: JSON.stringify({ participantCode }),
  });

  return (await response.json()) as ResponseStudyInfo;
};

export const requestCheckIsMember = (studyId: string, memberId: string) =>
  http.get<ResponseIsCheckMember>(`/api/studies/${studyId}/members/${memberId}`);

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
  http.get<Omit<ResponseStudyMetadata, 'member'>>(`/api/v2/studies/${studyId}`);

export const requestGetStudyMembers = (studyId: string) =>
  http.get<Pick<ResponseStudyMetadata, 'members'>>(`/api/v2/members?studyId=${studyId}`);

export const requestGetMemberRecordContents = (studyId: string, memberId: string) =>
  http.get<ResponseMemberRecordContents>(`/api/v2/studies/${studyId}/contents?memberId=${memberId}`);
