import useCacheFetch from '@Hooks/api/useCacheFetch';

import { requestGetParticipantRecordContents } from '@Apis/index';

const useParticipantRecordContents = (studyId: string, progressId: string) => {
  const { result, isLoading } = useCacheFetch(() => requestGetParticipantRecordContents(studyId, progressId), {
    cacheKey: ['participantRecordContent', studyId, progressId],
    cacheTime: 30 * 1000,
    enabled: true,
  });
  const participantRecordContents = result?.data.content || [];

  return { participantRecordContents, isLoading };
};

export default useParticipantRecordContents;
