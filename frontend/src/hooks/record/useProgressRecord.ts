/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

import { requestGetMemberRecordContents } from '@Apis/index';

import type { MemberRecordContent } from '@Types/study';

const useProgressRecord = (studyId: string, progressId: string) => {
  const [memberRecordContents, setMemberRecordContents] = useState<MemberRecordContent[] | null>(null);

  const isLoading = !memberRecordContents;

  const fetchMemberRecordData = useCallback(async () => {
    const { data } = await requestGetMemberRecordContents(studyId, progressId);

    setMemberRecordContents(data.content);
  }, [progressId, studyId]);

  useEffect(() => {
    fetchMemberRecordData();
  }, [fetchMemberRecordData]);

  return { memberRecordContents, isLoading };
};

export default useProgressRecord;
