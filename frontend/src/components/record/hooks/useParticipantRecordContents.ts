import useFetch from '@Hooks/api/useFetch';

import { requestGetParticipantRecordContents } from '@Apis/index';

const useParticipantRecordContents = (studyId: string, progressId: string) => {
  const { result, isLoading } = useFetch(() => requestGetParticipantRecordContents(studyId, progressId), {
    suspense: false,
  });
  const participantRecordContents = result?.data.content || [];

  return { participantRecordContents, isLoading };
};

export default useParticipantRecordContents;
