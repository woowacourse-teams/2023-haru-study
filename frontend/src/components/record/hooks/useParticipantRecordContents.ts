import useCacheMutation from '@Hooks/api/useCacheMutation';

import { requestGetParticipantRecordContents } from '@Apis/index';

const useParticipantRecordContents = (studyId: string, progressId: string) => {
  const { result, isLoading } = useCacheMutation(() => requestGetParticipantRecordContents(studyId, progressId), {
    queryKey: ['participantRecordContent', studyId, progressId],
    cacheTime: 24 * 60 * 60 * 1000,
  });
  const participantRecordContents = result?.data.content || [];

  return { participantRecordContents, isLoading };
};

export default useParticipantRecordContents;
