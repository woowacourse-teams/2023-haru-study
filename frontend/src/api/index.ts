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

export const createStudy = async (studyName: string | null, totalCycle: number | null, timePerCycle: number | null) =>
  request(`/api/studies`, {
    method: 'POST',
    body: JSON.stringify({ studyName, totalCycle, timePerCycle }),
  }).then((result): Promise<{participantCode: string}> => result.json());
