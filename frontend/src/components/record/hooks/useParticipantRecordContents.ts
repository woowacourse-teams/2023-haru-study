import useCacheFetch from '@Hooks/api/useCacheFetch';

import { requestGetParticipantRecordContents } from '@Apis/index';

const useParticipantRecordContents = (studyId: string, progressId: string) => {
  const { result, isLoading } = useCacheFetch(() => requestGetParticipantRecordContents(studyId, progressId), {
    cacheKey: ['participantRecordContent', studyId, progressId],
    cacheTime: 24 * 60 * 60 * 1000,
  });
  const participantRecordContents = result?.data.content || [];

  return { participantRecordContents, isLoading };
};

export default useParticipantRecordContents;
