const request = async (path: string, init?: RequestInit) => {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) throw new Error(response.status.toString());
  return response;
};

export const createStudy = (studyName: string, totalCycle: number, timePerCycle: number) =>
  request(`/api/studies`, {
    method: 'POST',
    body: JSON.stringify({ name: studyName, totalCycle, timePerCycle }),
  });

export const startStudy = (nickName: string | null, studyId: string | null) =>
  request(`/api/studies/${studyId ?? ''}/members`, {
    method: 'POST',
    body: JSON.stringify({ nickName }),
  });

export const authenticateParticipantCode = (participantCode: string, memberId: number | null) =>
  request(`api/studies/authenticate`, {
    method: 'POST',
    body: JSON.stringify({ participantCode, memberId }),
  });
